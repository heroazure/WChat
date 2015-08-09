namespace WChatApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class IsGroupChat : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Rooms", "IsGroupChat", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Rooms", "IsGroupChat");
        }
    }
}
