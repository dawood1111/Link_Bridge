using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace RegionServicesapi.Model
{
    public class User : IdentityUser
    {
        public string Role { get; set; }
<<<<<<< HEAD
     
        public AboutHelper aboutHelper { get; set; }
        public ConstructionProject constructionProject { get; set; }
        public AboutCompanies aboutCompanies { get; set; }
    }
  
=======
        public List<HelpRequest> HelpRequests { get; set; }
        public AboutHelper aboutHelper { get; set; }
        public List<Services> services { get; set; }
    }
>>>>>>> 40c7716103912476e76d10d313be518b8f89666b
}