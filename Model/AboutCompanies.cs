namespace RegionServices.Model
{
    public class AboutCompanies
    {
        public int Id { get; set; }
        public String CompanyName { get; set; }=string.Empty;
        public String SolutionType { get; set; }=string.Empty;
        public String CompanyDescription { get; set; }=string.Empty;
        public String ContactNumber { get; set; }=string.Empty;
        public String Address { get; set; }=string.Empty;
        public String UserId { get; set; }
        public User user { get; set; }
        public DateTime StartedAt { get; set; }
        public int CompanySize { get; set; }

        //adding rating system in future




    }
}