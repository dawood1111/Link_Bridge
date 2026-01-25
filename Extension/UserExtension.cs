using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RegionServices.Extension


{
   
    
    public static class UserExtension
    {
        public static String GetEmail(this ClaimsPrincipal User0)
        {
            var claim0 = User0.Claims.SingleOrDefault(s => s.Type == ClaimTypes.Email);
            
            if (claim0 == null)
                throw new Exception("Email claim not found.");



            return claim0.Value;
        }
        
    }

}

