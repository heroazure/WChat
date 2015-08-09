using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace WChatApi.Models
{
    public class WChatContext : DbContext//, IdentityDbContext<ApplicationUser>
    {
        public WChatContext()
            : base("name=WChatConnection")
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<WChatContext>());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //throw new UnintentionalCodeFirstException();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<UserRoom> UserRooms { get; set; }
        public DbSet<Friend> Friends { get; set; }
    }
}