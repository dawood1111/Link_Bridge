
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
using System.Threading.Tasks;
using RegionServices.Interface;
namespace Api.Controller
{

    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly ApplicationDBcontext _context;
        private readonly INotification _INotification;
        public NotificationController(ApplicationDBcontext context, INotification Notification)
        {
            _context = context;
            _INotification = Notification;
        }


        [HttpPost("SendNotification")]
        public async Task<IActionResult> SendNotification([FromBody] UserNotificationDTO notificationDTO)
        {
            var GetEmail = User.GetEmail();
            await _INotification.SendNotification(notificationDTO, GetEmail);

            return Ok("Notification Sent Succefully");
        }


        [Authorize]
        [HttpGet("GetNotifications")]
        public async Task<IActionResult> GetNotifications()
        {
            var GetEmail = User.GetEmail();
            var notification = await _INotification.GetNotification(GetEmail);
            return Ok(notification);


        }
        [HttpDelete]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var FindDeletion = await _context.Notifications.FindAsync(id);
            if (FindDeletion == null)
            {
                return NotFound("no Noti with this id");
            }
            _context.Notifications.Remove(FindDeletion);
            await _context.SaveChangesAsync();
            return Ok("Deleted Successfully");
        }

    }
}