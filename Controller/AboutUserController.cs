using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegionServicesapi.DBcontext;
using RegionServicesapi.DTO;
using RegionServicesapi.Extension;
using RegionServicesapi.Mapper;
using RegionServicesapi.Model;

namespace RegionServicesapi.Controller
{
    [ApiController]
    [Route("api/AboutUser")]
    public class AboutUserController : ControllerBase
    {
        private readonly ApplicationDBcontext _context;
        private readonly UserManager<User> _userManager;
        public AboutUserController(ApplicationDBcontext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

            [Authorize(Roles ="helper")]
        [HttpPost("AddAboutUser")]

        public async Task<IActionResult> AddUser([FromBody] AboutUserDto aboutUserDto)
        {
            var GetName = User.GetName();
            var FindUserName = await _userManager.FindByNameAsync(GetName);

            if (FindUserName == null)
            {
                return BadRequest("No email was entered");
            }

            var AboutUserModel = aboutUserDto.ToAboutHelper(FindUserName.Id);


            await _context.AboutHelpers.AddAsync(AboutUserModel);
            await _context.SaveChangesAsync();

            return Ok(AboutUserModel);


        }
        

    }
}