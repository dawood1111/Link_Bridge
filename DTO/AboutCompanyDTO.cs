namespace RegionServices.DTO
{
    public class AboutCompanyDTO
    {
        public String CompanyName { get; set; } = string.Empty;
        public String SolutionType { get; set; } = string.Empty;
        public IFormFile? CompanyLogo { get; set; }
        public String CompanyDescription { get; set; } = string.Empty;
        public String ContactNumber { get; set; } = string.Empty;
        public String Address { get; set; } = string.Empty;
        public DateTime StartedAt { get; set; }
        public int CompanySize { get; set; }


    }
}