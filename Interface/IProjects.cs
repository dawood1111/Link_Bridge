using Microsoft.AspNetCore.Mvc;
using RegionServices.DTO;
using RegionServices.Model;

namespace RegionServices.Interface
{
    public interface IProjects
    {
        public Task<List<Project>> GetCompanyEngineer();
        public Task<bool> CreateProject(EngineerProjectDTO ProjectDTO, string UserId);

        public Task<List<Project>> GetUserProjects(string UserToken);

    }
}