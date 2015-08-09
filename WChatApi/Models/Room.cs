using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WChatApi.Models
{
    public class Room
    {
        public Guid RoomId { get; set; }

        public string Title { get; set; }

        public Guid OwnerId { get; set; }

        public DateTime CreateDate { get; set; }

        public bool IsGroupChat { get; set; }

        public virtual ICollection<Message> Messages { get; set; }

        public virtual ICollection<User> Users { get; set; }


    }
}