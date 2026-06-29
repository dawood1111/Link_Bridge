using RegionServices.Model;

namespace RegionServices.DTO
{
    public class EngineerProjectDTO
    {
        public String ProjectTitle { get; set; }=string.Empty;
        public String ProjectLocation  { get; set; }=string.Empty;
        public String ProjectDescription { get; set; }  = string.Empty;
        public String ProjectSize { get; set; } = string.Empty;
         public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public String ProjectStatus { get; set; }=string.Empty;
        public String ProjectCategory { get; set; }=string.Empty;
        public int MinBudget { get; set; }
        public int MaxBudget { get; set; }
        public List<IFormFile> ImagesList { get; set; }        
    }
}