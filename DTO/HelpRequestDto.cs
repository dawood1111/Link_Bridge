using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RegionServicesapi.DTO
{
    public class HelpRequestDto
    {

        public String Region { get; set; }
        public String Description { get; set; }
        public List<IFormFile> Image { get; set; }

    }
}