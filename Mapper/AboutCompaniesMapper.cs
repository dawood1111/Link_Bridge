using RegionServices.Model;

namespace RegionServices.Mapper
{
    public static class AboutCompaniesMapper
    {
        public static AboutCompanies ToAboutCompany(this DTO.AboutCompanyDTO dto,string userId,string Logo)
        {
            return new AboutCompanies
            {
                CompanyName = dto.CompanyName,
                SolutionType = dto.SolutionType,
                CompanyDescription = dto.CompanyDescription,
                ContactNumber = dto.ContactNumber,
                Address = dto.Address,
                StartedAt = dto.StartedAt,
                CompanySize = dto.CompanySize,
                UserId=userId,
                CompanyLogo = Logo
            };
            
        }
    }
}