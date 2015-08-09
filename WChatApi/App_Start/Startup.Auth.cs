using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WChatApi
{
    public partial class Startup
    {
        public void ConfigureAuth(IAppBuilder app)
        {
            // 配置Middleware 組件
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login"),
                CookieSecure = CookieSecureOption.Never,
            });
        }
    }
}