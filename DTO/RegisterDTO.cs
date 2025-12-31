using System;
using System.Collections.Generic;
<<<<<<< HEAD
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using RegionServicesapi.Model;
=======
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;
>>>>>>> 40c7716103912476e76d10d313be518b8f89666b

namespace RegionServicesapi.DTO
{
    public class RegisterDTO
    {
<<<<<<< HEAD
         [Required (ErrorMessage ="First name is required")]
         public String FirstName { get; set; } = string.Empty;
        [Required (ErrorMessage ="Last name is required")]
        public String LastName{ get; set; } = string.Empty;
      
        [Required (ErrorMessage ="Email is required")]
        public String Email { get; set; } = string.Empty;
        [Required (ErrorMessage ="Password is required")]
        [MinLength(7,ErrorMessage ="Password must be at least 7 characters long")]
        [MaxLength(22,ErrorMessage ="Password must not exceed 22 characters")]
        public String Password { get; set; } = string.Empty;
        [Required (ErrorMessage ="Phone number is required")]
        public String PhoneNumber { get; set; } = string.Empty;
        [Required (ErrorMessage ="Role is required")]
=======
       public String FirstName { get; set; } = string.Empty;
        public String LastName{ get; set; } = string.Empty;
        public String Email { get; set; } = string.Empty;
        public String Password { get; set; } = string.Empty;
        public String PhoneNumber { get; set; } = string.Empty;
>>>>>>> 40c7716103912476e76d10d313be518b8f89666b
        public String Role { get; set; } = string.Empty;


    }
}