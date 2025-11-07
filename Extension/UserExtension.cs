using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RegionServicesapi.Extension
{
    public static class UserExtension
    {
        public static String GetName(this ClaimsPrincipal User0)
        {
            var claim0 = User0.Claims.SingleOrDefault(s => s.Type == ClaimTypes.GivenName);
            
            if (claim0 == null)
                throw new Exception("GivenName claim not found.");

            return claim0.Value;
        }
        
    }
}