using Microsoft.AspNetCore.Mvc;
using RegionServicesapi.Model;

namespace RegionServicesapi.Interface
{
    public interface IConstructionCompany
    {
         public Task<List<ConstructionProject>> GetCompanyEngineer();

    }
}