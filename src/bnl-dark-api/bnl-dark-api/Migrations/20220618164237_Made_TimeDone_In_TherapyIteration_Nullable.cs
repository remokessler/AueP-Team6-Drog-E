using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bnl_dark_api.Migrations
{
    public partial class Made_TimeDone_In_TherapyIteration_Nullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeTableEntries_Users_UserId",
                table: "TimeTableEntries");

            migrationBuilder.DropIndex(
                name: "IX_TimeTableEntries_UserId",
                table: "TimeTableEntries");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TimeTableEntries");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "TimeDone",
                table: "TherapyIterations",
                type: "datetimeoffset",
                nullable: true,
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetimeoffset");

            migrationBuilder.AlterColumn<int>(
                name: "TimesDone",
                table: "Therapies",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "TimeTableEntries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "TimeDone",
                table: "TherapyIterations",
                type: "datetimeoffset",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetimeoffset",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TimesDone",
                table: "Therapies",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TimeTableEntries_UserId",
                table: "TimeTableEntries",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTableEntries_Users_UserId",
                table: "TimeTableEntries",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
