using RegionServices.DTO;
using RegionServices.Model;

namespace RegionServices.Mapper
{
    static public class UserNotificationMapper
    {
        static public UserNotification ToNotificationDTO(this UserNotificationDTO notification, String SenderName, String SenderPfp, String UserId)
        {
            return new UserNotification
            {
                SenderName = SenderName,
                SenderPfp = SenderPfp,
                UserId = UserId,
                ReceiverId = notification.ReceiverId,
                Type = notification.Type,
                Message = notification.Message,
                SentAt = DateTime.UtcNow

            };
        }
    }
}