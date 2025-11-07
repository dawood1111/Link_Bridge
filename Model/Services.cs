using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RegionServicesapi.Model
{
    public class Services
    {
        public int Id { get; set; }
        public String ServicesName { get; set; }
        public List<HelpRequest> HelpRequests { get; set; }
        public List<SubServices> SubServices { get; set; }
        public string userId { get; set; }
        public User Users { get; set; }


    }
}