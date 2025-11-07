using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace RegionServicesapi.DTO
{
    public class RegisterDTO
    {
       public String FirstName { get; set; } = string.Empty;
        public String LastName{ get; set; } = string.Empty;
        public String Email { get; set; } = string.Empty;
        public String Password { get; set; } = string.Empty;
        public String PhoneNumber { get; set; } = string.Empty;
        public String Role { get; set; } = string.Empty;


    }
}