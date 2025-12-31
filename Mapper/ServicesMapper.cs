using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RegionServicesapi.DTO;
using RegionServicesapi.Model;

namespace RegionServicesapi.Mapper
{
    public static class ServicesMapper
    {
        public static Services ToServices(this ServicesDto servicesDto,string userId)
        
        {
            return new Services
            {
                userId=userId,
                ServicesName =servicesDto.ServicesName

            };
            
        }
    }
}