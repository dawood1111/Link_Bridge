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
    public class AboutCompaniesController : ControllerBase
    {
        private readonly ApplicationDBcontext _context;
        private readonly IWebHostEnvironment _env;
        public AboutCompaniesController(ApplicationDBcontext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;

        }
        [HttpGet("GetAllCompanies")]

        public async Task<IActionResult> GetAllCompanies()
        {
            var GetAllCompaniesModel = await _context.AboutCompanies.ToListAsync();
            if (GetAllCompanies == null)
            {
                return NotFound("No Data Found");
            }
            return Ok(GetAllCompaniesModel);

        }

        [Authorize(Roles = "Company")]
        [HttpPost("PostCompanyProfile")]

        public async Task<IActionResult> PostCompanyProfile([FromForm] AboutCompanyDTO aboutCompanyDTO)
        {
            var GetEmail = User.GetEmail();
            var FindUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == GetEmail);
            if (FindUser == null)
            {
                return NotFound("User Not Found ");
            }


            string? logoUrl = null;

            if (aboutCompanyDTO.CompanyLogo != null)

            {
                var folder = Path.Combine(_env.WebRootPath, "logos");
                Directory.CreateDirectory(folder);
                var fileName = $"{Guid.NewGuid()}_{aboutCompanyDTO.CompanyLogo.FileName}";
                var filePath = Path.Combine(folder, fileName);

                using var stream = new FileStream(filePath, FileMode.Create);
                await aboutCompanyDTO.CompanyLogo.CopyToAsync(stream);
                logoUrl = $"{Request.Scheme}://{Request.Host}/logos/{fileName}";
            }

            var existingProfile = await _context.AboutCompanies
     .FirstOrDefaultAsync(c => c.UserId == FindUser.Id);

            if (existingProfile != null)
            {
                return BadRequest("Company profile already exists for this user.");
            }



            var AboutCompanyDTO = aboutCompanyDTO.ToAboutCompany(FindUser.Id, logoUrl);
            await _context.AboutCompanies.AddAsync(AboutCompanyDTO);

            await _context.SaveChangesAsync();

            return Ok("Company profile was created successfully");


        }

        [HttpGet("GetCompanyProfile")]
        public async Task<IActionResult> QueryCompanyProfile([FromQuery] CompanyProfileQuery query)
        {
            var CompanyProfile = _context.AboutCompanies.AsQueryable();
            if (!string.IsNullOrEmpty(query.CompanyName))
            {
                CompanyProfile = CompanyProfile.Where(c => c.CompanyName == query.CompanyName);
            }
            if (!string.IsNullOrEmpty(query.SolutionType))
            {
                CompanyProfile = CompanyProfile.Where(c => c.SolutionType == query.SolutionType);
            }
            var companies = await CompanyProfile.ToListAsync();

            return Ok(companies);





        }
        [HttpGet("GetCompayProfileForQuotation")]
        public async Task<IActionResult> GetCompanyProfileForQuotation()
        {
            var GetEmail = User.GetEmail();
            var FindUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == GetEmail);
            if (FindUser == null)
            {
                return NotFound("User Not Found");

            }
            var CompanyProfile = await _context.AboutCompanies.Where(p => p.UserId == FindUser.Id).ToListAsync();
            if (CompanyProfile == null || CompanyProfile.Count == 0)
            {
                return NotFound("Company Profile Not Found");
            }
            return Ok(CompanyProfile);


        }
    }
}
