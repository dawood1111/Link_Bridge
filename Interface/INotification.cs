using RegionServices.DTO;
using RegionServices.Model;
namespace RegionServices.Interface
{
    public interface INotification
    {

        public Task<string> SendNotification(UserNotificationDTO notificationDTO, string UserId);
        public Task<List<UserNotification>> GetNotification(string SearchByEmail);
    }
}