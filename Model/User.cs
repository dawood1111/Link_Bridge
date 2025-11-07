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
        public List<HelpRequest> HelpRequests { get; set; }
        public AboutHelper aboutHelper { get; set; }
        public List<Services> services { get; set; }
    }
}