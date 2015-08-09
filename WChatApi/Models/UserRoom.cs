using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WChatApi.Models
{
    public class UserRoom
    {
        [Key]
        public Guid Guid { get; set; }

        //[ForeignKey("UserId")]
        public Guid UserId { get; set; }

        //[ForeignKey("RoomId")]
        public Guid RoomId { get; set; }

        public User User { get; set; }

        public Room Room { get; set; }
    }
}