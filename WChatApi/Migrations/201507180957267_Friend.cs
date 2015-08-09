namespace WChatApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Friend : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Friends",
                c => new
                    {
                        Guid = c.Guid(nullable: false),
                        UserId = c.Guid(nullable: false),
                        FriendUserId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Guid);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Friends");
        }
    }
}
