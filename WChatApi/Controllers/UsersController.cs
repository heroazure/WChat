using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WChatApi.Models;

namespace WChatApi.Controllers
{
    public class UsersController : ApiController
    {
        private WChatContext db = new WChatContext() { Configuration = { LazyLoadingEnabled = false } };

        //[HttpPost]
        [Authorize]
        [Route("api/users/rooms")]//[Route("api/users/{id}/rooms")]
        [ResponseType(typeof(Room))]
        public async Task<IHttpActionResult> GetRooms(Guid id)
        {
            List<Room> rooms = await db.UserRooms.Where(p => p.UserId == id).Select(r => r.Room).ToListAsync();
            if(rooms==null)
            {
                return NotFound();
            }
            return Ok(rooms);
        }

        // GET api/User
        [Authorize]
        public dynamic GetUsers()
        {
            // Custom LINQ query, as we don't want to return password values
            var users = from oUser in db.Users
                        select new
                        {
                            oUser.UserId,
                            oUser.UserName,
                            oUser.EmailAddress,
                            oUser.ApproverID
                        };

            return users.AsEnumerable();
        }

        // GET api/User/5
        /*public User GetUser(string emailAddress, string password)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return user;
        }*/

        // PUT api/User/5
        [Authorize]
        public HttpResponseMessage PutUser(Guid id, User user)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != user.UserId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                var crypto = new SimpleCrypto.PBKDF2();
                var encryptedPassword = crypto.Compute(user.Password);

                user.ApproverID = 1;
                user.Password = encryptedPassword;
                user.PasswordSalt = crypto.Salt;

                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/User
        //[Authorize]
        public HttpResponseMessage PostUser(User user)
        {
            if (ModelState.IsValid)
            {
                if (db.Users.Where(u => u.UserName == user.UserName).Count() > 0)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "{'error':'用户名已存在'}");
                }
                if (db.Users.Where(u => u.EmailAddress == user.EmailAddress).Count() > 0)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "{'error':'邮箱地址已被使用'}");
                }
                var crypto = new SimpleCrypto.PBKDF2();
                var encryptedPassword = crypto.Compute(user.Password);

                user.ApproverID = 1;
                user.Password = encryptedPassword;
                user.PasswordSalt = crypto.Salt;
                user.UserId = Guid.NewGuid();

                db.Users.Add(user);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, user);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = user.UserId }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/User/5
        [Authorize]
        public HttpResponseMessage DeleteUser(Guid id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Users.Remove(user);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, user);
        }




        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }

        private bool UserExists(Guid id)
        {
            return db.Users.Count(e => e.UserId == id) > 0;
        }
    }
}