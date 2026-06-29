using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using RegionServices.Extension;
using RegionServices.DBcontext;
using RegionServices.IInterface;
using RegionServices.Model;
using RegionServices.DTO;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Api.DTO;
using RegionServices.Interface;
using System.Threading.Tasks;


namespace Api.Controller
{
    [Route("api/Google")]
    [ApiController]
    public class GoogleController : ControllerBase
    {



        private readonly ApplicationDBcontext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ICreateToken _createToken;

        public GoogleController(ApplicationDBcontext context, UserManager<User> userManager, SignInManager<User> signInManager, ICreateToken createToken)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _createToken = createToken;

        }
        [HttpGet("login-google")]
        public async Task<IActionResult> LoginWithGoogle()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            var properties = new AuthenticationProperties
            {
                RedirectUri = Url.Action("GoogleCallback"),
                //Items =
                // {
                //   { "prompt", "select_account" },
                // { "max_age", "0" }
                //}
            };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);

        }

        [HttpGet("google-callback")]
        public async Task<IActionResult> GoogleCallback()
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            if (!result.Succeeded)
            {
                return BadRequest("Google authentication failed");
            }

            var claims = result.Principal.Claims;
            var email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var FirstName = claims.FirstOrDefault(c => c.Type == ClaimTypes.GivenName)?.Value;
            var LastName = claims.FirstOrDefault(c => c.Type == ClaimTypes.Surname)?.Value;
            if (email == null)
            {
                return BadRequest("Email claim not found");
            }
            var existingUser = await _userManager.Users.FirstOrDefaultAsync(e => e.Email == email);
            if (existingUser != null)
            {
                var token = _createToken.CreateToken(existingUser);
                SetAuthCookies(token);
                return Redirect("http://localhost:5173/MainPage/HomePage");
            }
            return Redirect("http://localhost:5173/GoogleRegister" +
                $"?email={email}&firstName={FirstName}&lastName={LastName}");


        }
        [HttpPost("register-google")]
        public async Task<IActionResult> RegisterGoogle([FromBody] GoogleRegisterDTO dto)
        {
            if (dto.Role != "User" && dto.Role != "Company")
            {
                return BadRequest("Invalid role. Role must be either 'User' or 'Company'.");
            }
            var existingUser = await _userManager.Users.FirstOrDefaultAsync(e => e.Email == dto.Email);
            if (existingUser != null)
            {
                return BadRequest("User with this email already exists");
            }
            var user = new User
            {
                UserName = dto.FirstName + dto.LastName,
                Email = dto.Email,
                Role = dto.Role,
                PhoneNumber = dto.PhoneNumber
            };
            var result = await _userManager.CreateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest("Failed to create user");
            }
            await _userManager.AddToRoleAsync(user, dto.Role);
            var token = _createToken.CreateToken(user);
            SetAuthCookies(token);
            return Ok(new
            {
                token,
                message = "Signup successful",
                user = new
                {
                    email = user.Email,
                    userName = user.UserName,
                    role = user.Role,
                    phoneNumber = user.PhoneNumber
                }
            }
            );



        }

        private void SetAuthCookies(string token)
        {
            var Cookies = new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.Now.AddDays(1)
            };
            Response.Cookies.Append("AuthToken", token, Cookies);

        }
    }
}