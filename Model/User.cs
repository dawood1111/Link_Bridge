using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace RegionServices.Model
{
    public class User : IdentityUser
    {
        public string Role { get; set; }

        public List<Project> constructionProject { get; set; } = new List<Project>();
        public AboutCompanies aboutCompanies { get; set; }
        public List<QuotationRequest> quotationRequests { get; set; } = new List<QuotationRequest>();

        public List<UserNotification> Notifications { get; set; } = new List<UserNotification>();

    }


}