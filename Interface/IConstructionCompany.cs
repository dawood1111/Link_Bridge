using Microsoft.AspNetCore.Mvc;
using RegionServices.Model;

namespace RegionServices.Interface
{
    public interface IConstructionCompany
    {
         public Task<List<Project>> GetCompanyEngineer();

    }
}