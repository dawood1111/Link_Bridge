using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RegionServicesapi.Model
{
    public class HelpRequest
    {
        public int Id { get; set; }
        public String Region { get; set; }
        public String Description { get; set; }
        public Services Services { get; set; }
        public int ServiceId { get; set; }
        public User Useres { get; set; }
        public String UserId { get; set; }
        public DateTime PostDate { get; set; }
        public List<ImagePost>  ImagePosts { get; set; }
        
        
    }
}