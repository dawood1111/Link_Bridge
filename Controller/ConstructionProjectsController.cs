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
    [Route("api/ConstructionProjects")]
    public class ConstructionProjectsController:ControllerBase
    {
        private readonly ApplicationDBcontext _context;
        private readonly UserManager<User> _userManager;
        private readonly IConstructionCompany _constructionCompany;
        private readonly IWebHostEnvironment _hostEnviroment;
        
        public ConstructionProjectsController(ApplicationDBcontext context,UserManager<User> userManager, IConstructionCompany constructionCompany, IWebHostEnvironment hostEnvironment)
        {
            _context=context;
            _userManager=userManager;
            _constructionCompany=constructionCompany;
            _hostEnviroment=hostEnvironment;
        }

         [HttpGet("GetEngineerProject")]        
     public async Task<IActionResult> GetAllEngineerProject()

        {
            var GetEngineerDataRepo=await _constructionCompany.GetCompanyEngineer();
            
            if(GetEngineerDataRepo==null)
            {
                return NotFound("No Data Found");
            }

              return Ok(GetEngineerDataRepo);
            
        }
    

       [Authorize(Roles="ConstructionCompany")]
       [HttpPost("PostEngineerProject")]
       public async Task<IActionResult> CreateEngineerProfile([FromForm]  EngineerProjectDTO engineerProjectDTO)
        {
            if (engineerProjectDTO == null)
            {
                return BadRequest("Data Is Null");
            }
            var GetEmail=User.GetEmail();
            var FindUser=await _userManager.FindByEmailAsync(GetEmail);
            if (FindUser == null)
            {
                return NotFound("Data Not Found");
            }

            var EngineerProjectModel=engineerProjectDTO.ToEngineerProject(FindUser.Id,_hostEnviroment);
               await _context.ConstructionProjects.AddAsync(EngineerProjectModel);
               await _context.SaveChangesAsync();
               return Ok(EngineerProjectModel);
      
        }
      

    }
        
    }
