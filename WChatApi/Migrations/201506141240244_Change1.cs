namespace WChatApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserRooms",
                c => new
                    {
                        User_UserId = c.Guid(nullable: false),
                        Room_RoomId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.User_UserId, t.Room_RoomId })
                .ForeignKey("dbo.Users", t => t.User_UserId, cascadeDelete: true)
                .ForeignKey("dbo.Rooms", t => t.Room_RoomId, cascadeDelete: true)
                .Index(t => t.User_UserId)
                .Index(t => t.Room_RoomId);
            
            AddColumn("dbo.Users", "IsOnLine", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserRooms", "Room_RoomId", "dbo.Rooms");
            DropForeignKey("dbo.UserRooms", "User_UserId", "dbo.Users");
            DropIndex("dbo.UserRooms", new[] { "Room_RoomId" });
            DropIndex("dbo.UserRooms", new[] { "User_UserId" });
            DropColumn("dbo.Users", "IsOnLine");
            DropTable("dbo.UserRooms");
        }
    }
}
