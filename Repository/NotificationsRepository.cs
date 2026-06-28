using RegionServices;
using RegionServices.DBcontext;
using RegionServices.Interface;
using RegionServices.DTO;
using RegionServices.Model;
using RegionServices.Mapper;
using Microsoft.EntityFrameworkCore;

namespace RegionServices.Repository
{
    public class NotificationsRepository : INotification
    {
        private readonly ApplicationDBcontext _context;
        public NotificationsRepository(ApplicationDBcontext context)
        {
            _context = context;
        }

        public async Task<string> SendNotification(UserNotificationDTO notificationDTO, string UserId)
        {
            string SenderName = " ";
            string Senderpfp = " ";
            var FindUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == UserId);
            if (FindUser == null)
                return "User Not Found";


            if (FindUser.Role == "Company")
            {
                var Company = await _context.AboutCompanies.FirstOrDefaultAsync(c => c.UserId == FindUser.Id);
                if (Company == null)
                {
                    return "No company available";
                }
                SenderName = Company.CompanyName;
                Senderpfp = Company.CompanyLogo;
            }
            else
            {
                SenderName = FindUser.UserName;
                Senderpfp = "";

            }
            var NotificationModel = notificationDTO.ToNotificationDTO(SenderName, Senderpfp, FindUser.Id);
            await _context.Notifications.AddAsync(NotificationModel);
            await _context.SaveChangesAsync();

            return "Notitfication sent Succefully";




        }
        public async Task<List<UserNotification>> GetNotification(string SearchByEmail)
        {
            var FindUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == SearchByEmail);

            if (FindUser == null)
            {
                return null;
            }

            var notification = await _context.Notifications
            .Where(n => n.ReceiverId == FindUser.Id)
                .OrderByDescending(n => n.SentAt)
                .ToListAsync();

            return notification;
        }

    }
}