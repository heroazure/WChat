namespace WChatApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change2 : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.UserRooms", newName: "UserRoom1");
            CreateTable(
                "dbo.UserRooms",
                c => new
                    {
                        Guid = c.Guid(nullable: false),
                        UserId = c.Guid(nullable: false),
                        RoomId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Guid)
                .ForeignKey("dbo.Rooms", t => t.RoomId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoomId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserRooms", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserRooms", "RoomId", "dbo.Rooms");
            DropIndex("dbo.UserRooms", new[] { "RoomId" });
            DropIndex("dbo.UserRooms", new[] { "UserId" });
            DropTable("dbo.UserRooms");
            RenameTable(name: "dbo.UserRoom1", newName: "UserRooms");
        }
    }
}
