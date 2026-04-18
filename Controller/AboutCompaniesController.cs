using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using RegionServices.Extension;
using RegionServices.DBcontext;
using RegionServices.IInterface;
using RegionServices.Model;
using RegionServices.DTO;
using RegionServices.Mapper;

namespace RegionServices.Controllers
{
    
    [Route("api/AboutUser")]
    [ApiController]
    public class AboutCompaniesController: ControllerBase
    {
        private readonly ApplicationDBcontext _context;
        public AboutCompaniesController(ApplicationDBcontext context)
        {
            _context = context;

        }
        [HttpGet("GetAllCompanies")]
       
        public async Task<IActionResult> GetAllCompanies()
        {
            var GetAllCompaniesModel=await _context.AboutCompanies.ToListAsync();
            if (GetAllCompanies == null)
            {
                return NotFound("No Data Found");
            }
            return Ok(GetAllCompaniesModel);
            
        }
        [Authorize(Roles = "Company")]
        [HttpPost("PostCompanyProfile")]

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
           var AboutCompanyDTO=  aboutCompanyDTO.ToAboutCompany(FindUser.Id);
            await _context.AboutCompanies.AddAsync(AboutCompanyDTO);
            await _context.SaveChangesAsync();

              return Ok("Company profile was created successfully");


        }
        [HttpGet("GetCompanyProfile")]
        public async Task<IActionResult> QueryCompanyProfile([FromQuery] CompanyProfileQuery query)
        {
            var CompanyProfile= _context.AboutCompanies.AsQueryable();
            if(!string.IsNullOrEmpty(query.CompanyName))
            {
                CompanyProfile= CompanyProfile.Where(c=>c.CompanyName==query.CompanyName);
            }
            if(!string.IsNullOrEmpty(query.SolutionType))
            {
                CompanyProfile= CompanyProfile.Where(c=>c.SolutionType==query.SolutionType);
            }
            var companies = await CompanyProfile.ToListAsync();
            
            return Ok(companies);

           
          


        }

        
    }
    }
