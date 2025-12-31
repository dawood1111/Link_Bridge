using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RegionServicesapi.Model;

namespace RegionServicesapi.IInterface
{
    public interface ICreateToken
    {
        public String CreateToken(User user);
    }
}