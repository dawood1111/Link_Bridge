using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RegionServicesapi.DTO;
using RegionServicesapi.Model;

namespace RegionServicesapi.Mapper
{
    public static class AboutUserMapper
    {
        public static AboutHelper ToAboutHelper(this AboutUserDto aboutUserDto,string userId)
        {
            return new AboutHelper
            {
                Major = aboutUserDto.Major,
                Experience = aboutUserDto.Experience,
                Location = aboutUserDto.Location,
                ServiceType = aboutUserDto.ServiceType,
                UserId=userId
                

            };
        }
        
    }
}