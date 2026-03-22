namespace RegionServices.Model
{
    public class Images
    {
        public int Id { get; set; }
        public String Image { get; set; }=string.Empty;
        public Project? Project { get; set; }
        public int? ConstructionProjectId { get; set; }

    }
}