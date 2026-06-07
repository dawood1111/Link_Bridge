
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using RegionServices.Extension;
using RegionServices.DBcontext;
using RegionServices.IInterface;
using RegionServices.Model;
using RegionServices.DTO;
using RegionServices.Mapper;
namespace Api.Controller
{

    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly ApplicationDBcontext _context;
        public NotificationController(ApplicationDBcontext context)
        {
            _context = context;
        }

        [HttpPost("SendNotification")]
        public async Task<IActionResult> SendNotification([FromBody] UserNotificationDTO notificationDTO)
        {
            var GetEmail = User.GetEmail();
            var FindUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == GetEmail);
            string SenderName = " ";
            String Senderpfp = " ";


            if (FindUser == null)
            {
                return NotFound("User Not Found");
            }


            if (FindUser.Role == "Company")
            {
                var Company = await _context.AboutCompanies.FirstOrDefaultAsync(c => c.UserId == FindUser.Id);
                if (Company == null)
                {
                    NotFound("No company available");
                }
                SenderName = Company.CompanyName;
                SenderName = Company.CompanyLogo;
            }
            else
            {
                SenderName = FindUser.UserName;
                Senderpfp = "";

            }
            var NotificationModel = notificationDTO.ToNotificationDTO(SenderName, Senderpfp, FindUser.Id);
            await _context.Notifications.AddAsync(NotificationModel);
            await _context.SaveChangesAsync();

            return Ok("Notification Sent Successfully");


        }
        [Authorize]
        [HttpGet("GetNotifications")]
        public async Task<IActionResult> GetNotifications()
        {
            var GetEmail = User.GetEmail();
            var FindUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == GetEmail);
            if (FindUser == null)
            {
                return NotFound("User Not Found");
            }
            var GetNotifications = await _context.Notifications
            .Where(n => n.ReceiverId == FindUser.Id)
                .Select(n => new
                {
                    n.Id,
                    n.SenderName,
                    n.SenderPfp,
                    n.Message,
                    n.Type,
                    n.SentAt
                })
                .OrderByDescending(n => n.SentAt)
                .ToListAsync();


            if (GetNotifications == null)
            {
                return NotFound("No Data Found");
            }
            return Ok(GetNotifications);


        }

    }
}