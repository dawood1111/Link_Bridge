using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegionServicesapi.DBcontext;
using RegionServicesapi.DTO;
using RegionServicesapi.Extension;
using RegionServicesapi.Mapper;

namespace RegionServicesapi.Controller
{
    [ApiController]
    [Route("api/AboutCompanies")]
    public class AboutCompaniesController:ControllerBase
    {
        private readonly ApplicationDBcontext _context;
        public AboutCompaniesController(ApplicationDBcontext context)
        {
            _context=context;
        }


        [HttpGet("GetAllCompanies")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> GetAllCompanies()
        {
            var GetAllCompaniesModel=await _context.AboutCompanies.ToListAsync();
            if (GetAllCompanies == null)
            {
                return NotFound("No Data Found");
            }
            return Ok(GetAllCompaniesModel);
            
        }

        [HttpPost("PostCompanyProfile")]
        [Authorize(Roles ="ITCompany,ConstructionCompany")]

        public async Task<IActionResult> PostCompanyProfile([FromBody] AboutCompanyDTO aboutCompanyDTO)
        {
            var GetEmail=User.GetEmail();
            var FindUser=await _context.Users.FirstOrDefaultAsync(u=>u.Email==GetEmail);
            if (FindUser == null)
            {
                return NotFound("User Not Found ");
            }
            if (aboutCompanyDTO == null)
            {
                return BadRequest("Data Is Null");
            }
           var AboutCompanyDTO=  aboutCompanyDTO.ToAboutCompany();
            await _context.AboutCompanies.AddAsync(AboutCompanyDTO);
            await _context.SaveChangesAsync();

              return Ok("Company profile was created successfully");


        }

        
    }
}