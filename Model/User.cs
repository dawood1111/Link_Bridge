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
     
        public AboutHelper aboutHelper { get; set; }
        public ConstructionProject constructionProject { get; set; }
        public AboutCompanies aboutCompanies { get; set; }
    }
  
}