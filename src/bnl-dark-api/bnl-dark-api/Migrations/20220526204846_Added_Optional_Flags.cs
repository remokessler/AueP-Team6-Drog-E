using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bnl_dark_api.Migrations
{
    public partial class Added_Optional_Flags : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stays_Patients_PatientId",
                table: "Stays");

            migrationBuilder.DropForeignKey(
                name: "FK_Stays_Rooms_RoomId",
                table: "Stays");

            migrationBuilder.DropForeignKey(
                name: "FK_Therapies_Medicines_MedicineId",
                table: "Therapies");

            migrationBuilder.AlterColumn<int>(
                name: "MedicineId",
                table: "Therapies",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "RoomId",
                table: "Stays",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "PatientId",
                table: "Stays",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Stays_Patients_PatientId",
                table: "Stays",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Stays_Rooms_RoomId",
                table: "Stays",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Therapies_Medicines_MedicineId",
                table: "Therapies",
                column: "MedicineId",
                principalTable: "Medicines",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stays_Patients_PatientId",
                table: "Stays");

            migrationBuilder.DropForeignKey(
                name: "FK_Stays_Rooms_RoomId",
                table: "Stays");

            migrationBuilder.DropForeignKey(
                name: "FK_Therapies_Medicines_MedicineId",
                table: "Therapies");

            migrationBuilder.AlterColumn<int>(
                name: "MedicineId",
                table: "Therapies",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RoomId",
                table: "Stays",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PatientId",
                table: "Stays",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Stays_Patients_PatientId",
                table: "Stays",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Stays_Rooms_RoomId",
                table: "Stays",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Therapies_Medicines_MedicineId",
                table: "Therapies",
                column: "MedicineId",
                principalTable: "Medicines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
