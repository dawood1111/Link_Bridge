using RegionServicesapi.Model;

namespace RegionServicesapi.Mapper
{
    public static class AboutCompaniesMapper
    {
        public static AboutCompanies ToAboutCompany(this DTO.AboutCompanyDTO dto )
        {
            return new AboutCompanies
            {
                CompanyName = dto.CompanyName,
                SolutionType = dto.SolutionType,
                CompanyDescription = dto.CompanyDescription,
                ContactNumber = dto.ContactNumber,
                Address = dto.Address,
                StartedAt = dto.StartedAt,
                CompanySize = dto.CompanySize
            };
            
        }
    }
}