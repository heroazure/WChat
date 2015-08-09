using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WChatApi.Models
{
    public class Friend
    {
        [Key]
        public Guid Guid { get; set; }

        //[ForeignKey("UserId")]
        public Guid UserId { get; set; }

        //[ForeignKey("UserId")]
        public Guid FriendUserId { get; set; }


    }
}