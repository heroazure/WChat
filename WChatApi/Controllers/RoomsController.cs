using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WChatApi.Models;

namespace WChatApi.Controllers
{
    //[Authorize]
    public class RoomsController : ApiController
    {
        private WChatContext db = new WChatContext() { Configuration = { LazyLoadingEnabled = false } };

        // GET api/values
        public IEnumerable<Room> Get()
        {
            return db.Rooms;
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
