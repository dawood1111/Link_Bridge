using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RegionServicesapi.Model
{
    public class AboutHelper
    {
        public int Id { get; set; }
        public String Major { get; set; }
        public String ServiceType { get; set; }
        public String Location { get; set; }
        public String Experience { get; set; }

        public String UserId { get; set; }
        public User HelperUser { get; set; }
    }
}