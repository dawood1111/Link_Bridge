using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
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
    [Route("Services")]
    public class ServicesController : ControllerBase
    {
        private readonly ApplicationDBcontext _context;
        private readonly UserManager<User> _userManager;
        public ServicesController(ApplicationDBcontext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("GetServices/{ServicesName}")]
        public async Task<IActionResult> Get([FromRoute] string ServicesName)
        {
            var services = await _context.Services.FirstOrDefaultAsync(cn=>cn.ServicesName==ServicesName);
            if (services == null)
            {
                return NotFound("There is no category with this name");
            }
            return Ok(services);
            
        }
        
        [Authorize(Roles = "helper")]
        [HttpPost("Add")]
        
        public async Task<IActionResult> Create([FromBody] ServicesDto servicesDto)
        {
            var GetUserName = User.GetName();
            var FindUser=await _userManager.FindByNameAsync(GetUserName);

            if (FindUser == null)
            {
                return BadRequest("No email was entered");
            }


            var servicesModel = servicesDto.ToServices(FindUser.Id);
            await _context.Services.AddAsync(servicesModel);
            await _context.SaveChangesAsync();
            return Ok(servicesModel);

        }


    }
}