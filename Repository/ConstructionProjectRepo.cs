using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegionServices.Interface;
using RegionServices.DBcontext;
using System.ComponentModel;
using RegionServices.Model;
using Microsoft.AspNetCore.Identity;
using RegionServices.Extension;
using RegionServices.DTO;

namespace RegionServices.Repository

{
    public class ConstructionProjectRepo: IConstructionCompany
    {
        private readonly ApplicationDBcontext _context;

        public ConstructionProjectRepo(ApplicationDBcontext context)
        {
            _context=context;
           
        }
       public async Task<List<Project>> GetCompanyEngineer()
        { 
          var GetEngineerData= await _context.ConstructionProjects.Include(p=>p.Images).Include(u=>u.user).ToListAsync();

            return GetEngineerData;
        }
       
    }
}