using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    [Route("api/HelpRequest")]
    public class HelpRequestController : ControllerBase
    {
        private readonly ApplicationDBcontext _context;
        private readonly IWebHostEnvironment _hostEnviroment;
        private readonly UserManager<User> _user;
        public HelpRequestController(ApplicationDBcontext context, IWebHostEnvironment hostEnvironment, UserManager<User> user)
        {
            _context = context;
            _hostEnviroment = hostEnvironment;
            _user = user;
        }

        [HttpPost("PostHelpRequest")]
        public async Task<IActionResult> Create([FromForm] HelpRequestDto helpRequestDto, String CategoryName)
        {
            try
            {
                if (helpRequestDto == null)
                {
                    return BadRequest("Request Data Is Null");
                }
                var GetName = User.GetName();




                var GetGivenName = await _user.FindByNameAsync(GetName);
                var PickCategory = await _context.Services.FirstOrDefaultAsync(c => c.ServicesName == CategoryName);

                if (string.IsNullOrWhiteSpace(GetGivenName.Id))

                    return NotFound("User return null");

                if (PickCategory == null)
                {
                    return NotFound("Your category return null");
                }

                var HelpRequestModel = await helpRequestDto.ToHelpRequest(PickCategory.Id, _hostEnviroment, GetGivenName.Id);
                await _context.HelpRequests.AddAsync(HelpRequestModel);
                await _context.SaveChangesAsync();
                return Ok(HelpRequestModel);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error{ex.Message}");
            }

        }
        [HttpGet("GetHelpRequest")]
        public async Task<IActionResult> Get()
        {
            var GetData = await _context.HelpRequests.Select(s => new
            {
                Identifier = s.Id,
                Services = s.ServiceId,
                Images = s.ImagePosts,
                Description1=s.Description

            }

           ).ToListAsync();
            return Ok(GetData);
        }
       



    }
}