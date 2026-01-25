namespace RegionServices.Model
{
    public class ConstructionProject
    {
        public int Id { get; set; }
        public String ProjectTitle { get; set; }=string.Empty;
        public String ProjectLocation  { get; set; }=string.Empty;
        public String ProjectDescription { get; set; }  = string.Empty;
        public String ProjectSize { get; set; } = string.Empty;//number of building or floors etc
        public DateTime PostDate { get; set; }=DateTime.Now;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public String ProjectStatus { get; set; }=string.Empty;//Planning / Under construction / Finishing / Expansion
        public List<Images> Images { get; set; }
        public User user { get; set; }
        public String UserId { get; set; }
        

        

    }
}