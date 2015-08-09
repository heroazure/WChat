using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WChatApi.Models
{
    public class User
    {
        public Guid UserId { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string EmailAddress { get; set; }

        public string NickName { get; set; }

        public string PasswordSalt { get; set; }

        public int ApproverID { get; set; }

        public bool IsOnLine { get; set; }

        public virtual ICollection<Message> Messages { get; set; }

        public virtual ICollection<Room> Rooms { get; set; }
    }
}