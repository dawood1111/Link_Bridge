using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RegionServices.Model;
using RegionServices.IInterface;

namespace RegionServices.IInterface
{
    public interface ICreateToken
    {
        public String CreateToken(User user);
    }
}