using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using RegionServices.Model;
using System.IdentityModel.Tokens.Jwt;
using RegionServices.IInterface;
using System.Text;

namespace RegionServices.GenerateToken
{
    public class Token:ICreateToken
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        public Token(IConfiguration config)
        {
            _config = config;
           _key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]))
;
        }
        public String CreateToken(User user)
        {

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.Email ?? ""),
                new Claim(ClaimTypes.GivenName,user.UserName??" "),
                new Claim(ClaimTypes.NameIdentifier,user.Id),
                new Claim(ClaimTypes.Role,user.Role)
            };
            var cred = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
            var discreptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(10),
                SigningCredentials = cred,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var GeneratetheToken = tokenHandler.CreateToken(discreptor);
            return tokenHandler.WriteToken(GeneratetheToken);




        }



    }
}