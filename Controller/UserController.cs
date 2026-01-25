using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using RegionServices.Extension;
using RegionServices.DBcontext;
using RegionServices.IInterface;
using RegionServices.Model;
using RegionServices.Mapper;
using RegionServices.DTO;

namespace RegionServices.Controllers
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
                var token = _createToken.CreateToken(user);
                SetAuthCookies(token);

                if (AddRole.Succeeded)
                {
                    return Ok( new { 
             token,
            message = "Signup successful",
            user = new {
            email = user.Email,
            userName = user.UserName,
            role = user.Role
            }
            }
                    );}
                
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
            var token = _createToken.CreateToken(FindEmail);
            SetAuthCookies(token);
           return Ok(new { 
           token = token,
             message = "Login successful",
              user = new {
            email = FindEmail.Email,
            userName = FindEmail.UserName,
            role = FindEmail.Role
            }
                    
                }
                );
            
        }

        private void SetAuthCookies(string token)
        {
            var Cookies=new CookieOptions
            {
                HttpOnly=true,
                Secure=true,
                SameSite=SameSiteMode.None,
                Expires=DateTime.Now.AddDays(1)
              };
              Response.Cookies.Append("AuthToken",token,Cookies);
            
        }



}}


