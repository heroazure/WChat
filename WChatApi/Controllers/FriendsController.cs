using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WChatApi.Models;

namespace WChatApi.Controllers
{
    public class FriendsController : ApiController
    {
        private WChatContext db = new WChatContext() { Configuration = { LazyLoadingEnabled = false } };

        [Authorize]
        public dynamic GetFriends(Guid userId)
        {
            var friends = from u in db.Users
                          join f in db.Friends on u.UserId equals f.FriendUserId
                          where f.UserId == userId
                          select new
                          {
                              f.FriendUserId,
                              FriendName = u.UserName,
                              u.NickName,
                              u.IsOnLine
                          };
            return friends.AsEnumerable();
        }
    }
}
