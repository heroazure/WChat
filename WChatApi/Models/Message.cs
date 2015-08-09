using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WChatApi.Models
{
    public class Message
    {
        public Message()
        {
            Timestamp = DateTime.Now;
        }

        public Guid MessageId { get; set; }

        public string Text { get; set; }

        public DateTime Timestamp { get; set; }

        public Guid UserId { get; set; }

        public Guid RoomId { get; set; }
    }
}