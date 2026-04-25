using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using RegionServices.Extension;
using RegionServices.DBcontext;
using RegionServices.IInterface;
using RegionServices.Model;
using RegionServices.DTO;
using RegionServices.Interface;
using RegionServices.Repository;
using RegionServices.Mapper;
namespace RegionServices.Controllers
{

    [ApiController]
    [Route("api/Projects")]
    public class ConstructionProjectsController : ControllerBase
    {
        private readonly ApplicationDBcontext _context;
        private readonly UserManager<User> _userManager;
        private readonly IConstructionCompany _constructionCompany;
        private readonly IWebHostEnvironment _hostEnviroment;

        public ConstructionProjectsController(ApplicationDBcontext context, UserManager<User> userManager, IConstructionCompany constructionCompany, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _userManager = userManager;
            _constructionCompany = constructionCompany;
            _hostEnviroment = hostEnvironment;
        }

        [HttpGet("GetProjects")]
        public async Task<IActionResult> GetAllEngineerProject()

        {
            var GetEngineerDataRepo = await _constructionCompany.GetCompanyEngineer();

            if (GetEngineerDataRepo == null)
            {
                return NotFound("No Data Found");
            }


            return Ok(GetEngineerDataRepo);

        }



        [HttpPost("PostProjects")]
        public async Task<IActionResult> CreateEngineerProfile([FromForm] EngineerProjectDTO engineerProjectDTO)
        {
            if (engineerProjectDTO == null)
            {
                return BadRequest("Data Is Null");
            }
            var GetEmail = User.GetEmail();
            var FindUser = await _userManager.FindByEmailAsync(GetEmail);
            if (FindUser == null)
            {
                return NotFound("Data Not Found");
            }

            var EngineerProjectModel = engineerProjectDTO.ToEngineerProject(FindUser.Id, _hostEnviroment);
            if(engineerProjectDTO.MinBudget> engineerProjectDTO.MaxBudget)
            {
                return BadRequest("MinBudget cannot be greater than MaxBudget");
            }
          

          
            await _context.ConstructionProjects.AddAsync(EngineerProjectModel);
            await _context.SaveChangesAsync();
            return Ok(EngineerProjectModel);
        }
        
        [HttpGet("GetUserProjects")]
        [Authorize (Roles = "User")]
        public async Task<IActionResult> GetUserProjects()
        {
            var GetEmail = User.GetEmail();
            var FindUser = await _userManager.FindByEmailAsync(GetEmail);
            if (FindUser == null)
            {
                return NotFound("Data Not Found");
            }

            var UserProjects = await _context.ConstructionProjects.Where(p => p.UserId == FindUser.Id).Include(p=>p.QuotationRequests).ToListAsync();
            if (UserProjects == null || UserProjects.Count == 0)
            {
                return NotFound("No Projects Found for the User");
            }

            return Ok(UserProjects);
        }


    }

}
