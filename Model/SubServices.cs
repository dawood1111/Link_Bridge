using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RegionServicesapi.Model
{
    public class SubServices
    {
        public int Id { get; set; }
        public String SubServiceName { get; set; } = string.Empty;

        public int ServiceId { get; set; }
        public Services services { get; set; }



        
    }
}