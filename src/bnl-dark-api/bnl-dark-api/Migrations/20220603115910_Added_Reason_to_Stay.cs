using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bnl_dark_api.Migrations
{
    public partial class Added_Reason_to_Stay : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Reason",
                table: "Stays",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reason",
                table: "Stays");
        }
    }
}
