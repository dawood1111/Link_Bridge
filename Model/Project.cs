namespace RegionServices.Model
{
   
    public class Project
    {
       
       public int Id { get; set; }
        public String ProjectTitle { get; set; }=string.Empty;
        public String ProjectLocation  { get; set; }=string.Empty;
        public String ProjectDescription { get; set; }  = string.Empty;
        public String ProjectSize { get; set; } = string.Empty;//number of building or floors etc
        public DateTime PostDate { get; set; }=DateTime.Now;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ProjectStatus ProjectStatus { get; set; }
        public List<Images> Images { get; set; }=new List<Images>();
        public User user { get; set; }
        public String UserId { get; set; }
       
        

        

    }

  public  enum  ProjectStatus
    {
        Pending = 0,
        InProgress = 1,
        Completed = 2,
        Cancelled= 3
        
    }

   
}