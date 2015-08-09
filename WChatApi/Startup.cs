using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
[assembly: OwinStartup(typeof(WChatApi.Startup))]
namespace WChatApi
{
    /// <summary>
    /// To define the route that clients will use to connect to your Hub.
    /// </summary>
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Any connection or hub wire up and configuration should go here
            app.MapSignalR();
            ConfigureAuth(app);
            //app.UseCookieAuthentication(new CookieAuthenticationOptions());
           
        }
    }
}