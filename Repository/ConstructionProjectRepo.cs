using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegionServicesapi.Interface;
using RegionServicesapi.DBcontext;
using System.ComponentModel;
using RegionServicesapi.Model;
using Microsoft.AspNetCore.Identity;
using RegionServicesapi.Extension;
using RegionServicesapi.DTO;

namespace RegionServicesapi.Repository

{
    public class ConstructionProjectRepo: IConstructionCompany
    {
        private readonly ApplicationDBcontext _context;

        public ConstructionProjectRepo(ApplicationDBcontext context)
        {
            _context=context;
           
        }
        
        public async Task<List<ConstructionProject>> GetCompanyEngineer()
        { 
          var GetEngineerData= await _context.ConstructionProjects.ToListAsync();

            return GetEngineerData;
        }
       
    }
}