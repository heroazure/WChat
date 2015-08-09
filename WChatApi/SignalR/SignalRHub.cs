using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using WChatApi.Models;

namespace WChatApi.SignalR
{
    [HubName("WChatHub")]
    public class SignalRHub : Hub//, ApiController
    {
        
        private WChatContext db = new WChatContext() { Configuration = { LazyLoadingEnabled = false } };

        //用户进入页面时执行的（连接操作）
        public void userConnected(string roomId)
        {
            //进行编码，防止XSS攻击
            roomId = HttpUtility.HtmlEncode(roomId);
            Groups.Add(Context.ConnectionId, roomId);
            
        }

        //发送信息给所有人
        public void sendRoomMessage(string roomId,string message,string userId)
        {
            message = HttpUtility.HtmlEncode(message);
            Message ms = new Message() {
                MessageId=Guid.NewGuid(),
                Text=message,
                UserId = FormatGuid(userId),
                RoomId = FormatGuid(roomId)
            };
            db.Messages.Add(ms);
            db.SaveChanges();
            Clients.Group(roomId).sendRoomMessge(ms);
        }


        //当使用者断线时执行
        public override Task OnDisconnected(bool flag)
        {
            return base.OnDisconnected(flag);
        }

        

        #region 帮助程序
        private IAuthenticationManager Authentication
        {
            get { return HttpContext.Current.GetOwinContext().Authentication; }
        }

        private Guid GetCurrentUserId()
        {
            Guid userId = Guid.Empty;
            try
            {
                userId = new Guid(Authentication.User.Identity.Name);
            }
            catch
            {

            }
            return userId;
        }

        private Guid FormatGuid(string id)
        {
            try
            {
                return new Guid(id);
            }
            catch
            {
                return Guid.Empty;
            }
        }
        #endregion
    }
}