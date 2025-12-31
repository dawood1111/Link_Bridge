using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegionServicesapi.DBcontext;
using RegionServicesapi.DTO;
using RegionServicesapi.IInterface;
using RegionServicesapi.Model;

namespace RegionServicesapi.Controller
{
    [ApiController]
    [Route("api/User")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _SigninManager;
        private readonly RoleManager<IdentityRole> _RoleManager;

        private readonly ICreateToken _createToken;
        public UserController(UserManager<User> userManager, ICreateToken createToken, SignInManager<User> SigninManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _createToken = createToken;
            _SigninManager = SigninManager;
            _RoleManager = roleManager;




        }
        [HttpPost("CreteUser")]
        public async Task<IActionResult> CreteUser([FromBody] RegisterDTO registerDTO)
        {
            var user = new User
            {
                UserName = registerDTO.FirstName + registerDTO.LastName,
                Email = registerDTO.Email,
                PhoneNumber = registerDTO.PhoneNumber,
                Role = registerDTO.Role,
              
              
                
            };

            var CreateUser = await _userManager.CreateAsync(user, registerDTO.Password);
            if (CreateUser.Succeeded)
            {
                if (!await _RoleManager.RoleExistsAsync(registerDTO.Role))
                    return BadRequest("There is no role with that name");

                var AddRole = await _userManager.AddToRoleAsync(user, registerDTO.Role);

                if (AddRole.Succeeded)
                {
                    return Ok(_createToken.CreateToken(user));
                }
                else
                {
                    return StatusCode(500, "Failed To add role");

                }

            }
            else
            {
                return StatusCode(500,"Failed To Create User");
            }



        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            var FindEmail = await _userManager.Users.FirstOrDefaultAsync(e => e.Email == loginDTO.Email);
            if (FindEmail == null) return Unauthorized("Invalid Email");
            var CheckPass = await _SigninManager.CheckPasswordSignInAsync(FindEmail, loginDTO.Password, false);
            if (!CheckPass.Succeeded) return Unauthorized("Invalid Email or Password ");
            return Ok(_createToken.CreateToken(FindEmail));
            
        }
            
        }


    }
