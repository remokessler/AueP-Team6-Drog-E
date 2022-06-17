using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bnl_dark_api.Migrations
{
    public partial class Moved_Stay_To_Therapy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TherapyIterations_Stays_StayId",
                table: "TherapyIterations");

            migrationBuilder.DropIndex(
                name: "IX_TherapyIterations_StayId",
                table: "TherapyIterations");

            migrationBuilder.DropColumn(
                name: "StayId",
                table: "TherapyIterations");

            migrationBuilder.AddColumn<int>(
                name: "StayId",
                table: "Therapies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Therapies_StayId",
                table: "Therapies",
                column: "StayId");

            migrationBuilder.AddForeignKey(
                name: "FK_Therapies_Stays_StayId",
                table: "Therapies",
                column: "StayId",
                principalTable: "Stays",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Therapies_Stays_StayId",
                table: "Therapies");

            migrationBuilder.DropIndex(
                name: "IX_Therapies_StayId",
                table: "Therapies");

            migrationBuilder.DropColumn(
                name: "StayId",
                table: "Therapies");

            migrationBuilder.AddColumn<int>(
                name: "StayId",
                table: "TherapyIterations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TherapyIterations_StayId",
                table: "TherapyIterations",
                column: "StayId");

            migrationBuilder.AddForeignKey(
                name: "FK_TherapyIterations_Stays_StayId",
                table: "TherapyIterations",
                column: "StayId",
                principalTable: "Stays",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
