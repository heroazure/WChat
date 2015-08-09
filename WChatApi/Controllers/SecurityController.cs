using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using WChatApi.Models;

namespace WChatApi.Controllers
{
    public class SecurityController : ApiController
    {
        private WChatContext db = new WChatContext() { Configuration = { LazyLoadingEnabled = false } };

        public class LoginCredentials
        {
            public string EmailAddress { get; set; }
            public string Password { get; set; }
        }

        [HttpPost]
        public HttpResponseMessage Login(LoginCredentials credentials)
        {
            Guid UserID = Guid.Empty;

            if (IsValid(credentials.EmailAddress, credentials.Password, out UserID))
            {
                var claims = new List<Claim>() { new Claim(ClaimTypes.Name, UserID.ToString()) };
                var identity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);
                Authentication.SignIn(new AuthenticationProperties() { IsPersistent = false }, identity);
                
                return Request.CreateResponse(HttpStatusCode.OK, UserID);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
        }

        [HttpGet]
        [Route("api/security/logout")]
        public HttpResponseMessage Logout()
        {
            FormsAuthentication.SignOut();

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpGet]
        [Route("api/security/isAuthenticated")]
        public HttpResponseMessage IsAuthenticated()
        {
            if ((Authentication == null) || (Authentication.User == null) || (Authentication.User.Identity == null))
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Unauthorized);
                //response.Content = new StringContent("{\"error\":\"Unauthorized1\"}");
                return response;
            }
            else if (Authentication.User.Identity.IsAuthenticated)
            {
                return Request.CreateResponse(HttpStatusCode.OK, Convert.ToString(Authentication.User.Identity.Name));
            }

            return Request.CreateResponse(HttpStatusCode.Unauthorized, Authentication.User.Identity);
        }

        private bool IsValid(string emailAddress, string password, out Guid UserID)
        {
            var crypto = new SimpleCrypto.PBKDF2();
            bool isValid = false;
            Guid userID = Guid.Empty;

            var user = db.Users.FirstOrDefault(u => u.EmailAddress == emailAddress);

            if (user != null)
            {
                if (user.Password == crypto.Compute(password, user.PasswordSalt))
                {
                    isValid = true;
                    userID = user.UserId;
                }
            }

            UserID = userID;

            return isValid;
        }

        #region 帮助程序
        public static IAuthenticationManager Authentication
        {
            get { return HttpContext.Current.GetOwinContext().Authentication; }
        }
        #endregion
    }

}