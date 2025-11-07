using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RegionServicesapi.Model
{
    public class ImagePost
    {
        public int Id { get; set; }
        public String ImagePath { get; set; }
        public int HelpRequestId { get; set; }
        public HelpRequest helpRequest { get; set; }

    }
}