using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegionServices.Interface;
using RegionServices.DBcontext;
using System.ComponentModel;
using RegionServices.Model;
using Microsoft.AspNetCore.Identity;
using RegionServices.Extension;
using RegionServices.DTO;
using RegionServices.Mapper;

namespace RegionServices.Repository

{
    public class ProjectRepsitory : IProjects
    {
        private readonly ApplicationDBcontext _context;
        private readonly IWebHostEnvironment _hostEnviroment;

        public ProjectRepsitory(ApplicationDBcontext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnviroment = hostEnvironment;

        }
        public async Task<List<Project>> GetCompanyEngineer()
        {
            var GetEngineerData = await _context.ConstructionProjects.Include(p => p.Images).Include(u => u.user).ToListAsync();

            return GetEngineerData;
        }
        public async Task<bool> CreateProject(EngineerProjectDTO projectDTO, string UserId)
        {
            if (projectDTO == null)
            {
                return false;
            }

            if (UserId == null)
            {
                return false;
            }

            var EngineerProjectModel = projectDTO.ToEngineerProject(UserId, _hostEnviroment);
            if (projectDTO.MinBudget > projectDTO.MaxBudget)
            {
                return false;
            }
            await _context.ConstructionProjects.AddAsync(EngineerProjectModel);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> GetUserProjects(string UserToken)
        {
            var UserProjects = await _context.ConstructionProjects.Where(p => p.UserId == UserToken).Include(p => p.QuotationRequests).ThenInclude(q => q.AboutCompany).ToListAsync();
            if (UserProjects == null || UserProjects.Count == 0)
            {
                return false;
            }
            return true;
        }


    }
}