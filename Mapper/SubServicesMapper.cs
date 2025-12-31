using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RegionServicesapi.DTO;
using RegionServicesapi.Model;

namespace RegionServicesapi.Mapper
{
    public static class SubCategoriesMapper
    {
        public static SubServices ToSubSErvices(this SubServiceDto SubDto, int ServiceId) 
        {
            return new SubServices
            {
                SubServiceName = SubDto.ServicesName,
                ServiceId=ServiceId

            };
            
        }
        
    }
}