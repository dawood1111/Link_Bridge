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
        private readonly IProjects _Projects;
        private readonly IWebHostEnvironment _hostEnviroment;

        public ConstructionProjectsController(ApplicationDBcontext context, UserManager<User> userManager, IProjects projects, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _userManager = userManager;
            _Projects = projects;
            _hostEnviroment = hostEnvironment;
        }

        [HttpGet("GetProjects")]
        public async Task<IActionResult> GetAllEngineerProject()

        {
            var GetEngineerDataRepo = await _Projects.GetCompanyEngineer();

            if (GetEngineerDataRepo == null)
            {
                return NotFound("No Data Found");
            }


            return Ok(GetEngineerDataRepo);

        }



        [HttpPost("PostProjects")]
        public async Task<IActionResult> CreateEngineerProfile([FromForm] EngineerProjectDTO engineerProjectDTO)
        {

            var GetEmail = User.GetEmail();
            var FindUser = await _userManager.FindByEmailAsync(GetEmail);
            if (FindUser == null)
            {
                return NotFound("Data Not Found");
            }
            var Project = await _Projects.CreateProject(engineerProjectDTO, FindUser.Id);


            return Ok(Project);
        }

        [HttpGet("GetUserProjects")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetUserProjects()
        {
            var GetEmail = User.GetEmail();
            var FindUser = await _userManager.FindByEmailAsync(GetEmail);
            if (FindUser == null)
            {
                return NotFound("Data Not Found");
            }
            var GetProjectRepo = await _Projects.GetUserProjects(FindUser.Id);

            return Ok(GetProjectRepo);
        }


    }

}
