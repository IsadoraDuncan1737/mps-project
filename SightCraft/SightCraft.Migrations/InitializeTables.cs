using FluentMigrator;

namespace SightCraft.Migrations
{
    public class InitializeTables :AutoReversingMigration
    {
        public override void Up()
        {
            Create.Table("User")
                .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
                .WithColumn("Login").AsString(40).NotNullable()
                .WithColumn("PasswordHash").AsString(100).NotNullable()
                .WithColumn("RegistrationDate").AsDate().NotNullable();

            Create.Table("Sight")
                .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
                .WithColumn("Title").AsString(50).NotNullable()
                .WithColumn("FoundingDate").AsDate().NotNullable()
                .WithColumn("Type").AsString(20).NotNullable()
                .WithColumn("Location").AsString(50).NotNullable()
                .WithColumn("History").AsString(1500).NotNullable()
                .WithColumn("ImageUrl").AsString(int.MaxValue).NotNullable()
                .WithColumn("UserId").AsGuid().NotNullable().ForeignKey();

            Create.ForeignKey("FK_Sight_User")
                .FromTable("Sight")
                .ForeignColumn("UserId")
                .ToTable("User")
                .PrimaryColumn("Id");
        }
    }
}