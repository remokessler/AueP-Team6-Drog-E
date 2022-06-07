using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bnl_dark_api.Migrations
{
    public partial class Added_Ids_To_Robot_Message : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StayId",
                table: "TherapyIteration",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TherapyIteration_StayId",
                table: "TherapyIteration",
                column: "StayId");

            migrationBuilder.AddForeignKey(
                name: "FK_TherapyIteration_Stays_StayId",
                table: "TherapyIteration",
                column: "StayId",
                principalTable: "Stays",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TherapyIteration_Stays_StayId",
                table: "TherapyIteration");

            migrationBuilder.DropIndex(
                name: "IX_TherapyIteration_StayId",
                table: "TherapyIteration");

            migrationBuilder.DropColumn(
                name: "StayId",
                table: "TherapyIteration");
        }
    }
}
