using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegionServicesapi.DBcontext;
using RegionServicesapi.DTO;
using RegionServicesapi.Extension;
using RegionServicesapi.Interface;
using RegionServicesapi.Mapper;
using RegionServicesapi.Model;

namespace RegionServicesapi.Controllers

{
    [ApiController]
    [Route("api/EngineerCompany")]
    public class EngineerCompanyController:ControllerBase
    {
        private readonly ApplicationDBcontext _context;
        private readonly UserManager<User> _userManager;
        private readonly IConstructionCompany _constructionCompany;
        private readonly IWebHostEnvironment _hostEnviroment;
        
        public EngineerCompanyController(ApplicationDBcontext context,UserManager<User> userManager, IConstructionCompany constructionCompany, IWebHostEnvironment hostEnvironment)
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
      

    }}