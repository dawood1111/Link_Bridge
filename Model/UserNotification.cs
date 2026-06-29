namespace RegionServices.Model
{
    public class UserNotification
    {
        public int Id { get; set; }
        public String SenderName { get; set; } = string.Empty;
        public String SenderPfp { get; set; } = string.Empty;
        public String ReceiverId { get; set; } = string.Empty;
        public User Users { get; set; }
        public String UserId { get; set; }
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        public String Type { get; set; } = string.Empty;
        public String Message { get; set; } = string.Empty;


    }
}