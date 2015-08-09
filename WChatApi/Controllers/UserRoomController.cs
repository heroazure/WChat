using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Helpers;
using System.Web.Http;
using WChatApi.Models;

namespace WChatApi.Controllers
{
    [Authorize]
    public class UserRoomController : ApiController
    {
        private WChatContext db = new WChatContext() { Configuration = { LazyLoadingEnabled = false } };

        [HttpPost]
        //[Route("api/{controller}/{friends}")]
        public HttpResponseMessage CreateRoom(string friends)
        {
            
            if (friends == null || friends.Length < 1)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "未选择好友");
            }
            List<string> friendlist = friends.Split(',').ToList();
            try
            {
                string title = "";
                bool IsGroupChat = friendlist.Count > 1 ? true : false;
                foreach (string friend in friendlist)
                {
                    //Models.User user = db.Users.Find(friend);
                    //string nn = user.NickName;
                    title += db.Users.Find(new Guid(friend)).UserName+",";
                }
                Room room = new Room()
                {
                    RoomId=Guid.NewGuid(),
                    Title = title,
                    OwnerId = new Guid(SecurityController.Authentication.User.Identity.Name),
                    CreateDate = DateTime.Now,
                    IsGroupChat = IsGroupChat
                };
                db.Rooms.Add(room);
                db.SaveChanges();
                foreach (string friend in friendlist)
                {
                    db.UserRooms.Add(new UserRoom() {Guid=Guid.NewGuid(), RoomId = room.RoomId, UserId = new Guid(friend) });
                }
                db.UserRooms.Add(new UserRoom() { Guid = Guid.NewGuid(), RoomId = room.RoomId, UserId = new Guid(SecurityController.Authentication.User.Identity.Name) });
                db.SaveChanges();

                Dictionary<string, object> values = new Dictionary<string, object>();
                values.Add("roomId", room.RoomId.ToString());
                values.Add("title", title);
                DynamicJsonObject json = new DynamicJsonObject(values);
                return Request.CreateResponse(HttpStatusCode.Created,json);
            }
            catch(Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "创建群聊异常");
            }
        }
    }
}
