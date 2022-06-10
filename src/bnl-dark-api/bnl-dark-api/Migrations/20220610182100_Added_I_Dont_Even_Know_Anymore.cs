using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bnl_dark_api.Migrations
{
    public partial class Added_I_Dont_Even_Know_Anymore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RobotHealthMessage_Rooms_RoomId",
                table: "RobotHealthMessage");

            migrationBuilder.DropForeignKey(
                name: "FK_RobotHealthMessage_TherapyIteration_TherapyIterationId",
                table: "RobotHealthMessage");

            migrationBuilder.DropForeignKey(
                name: "FK_Stays_Patients_PatientId",
                table: "Stays");

            migrationBuilder.DropForeignKey(
                name: "FK_Stays_Rooms_RoomId",
                table: "Stays");

            migrationBuilder.DropForeignKey(
                name: "FK_Therapies_Medicines_MedicineId",
                table: "Therapies");

            migrationBuilder.DropForeignKey(
                name: "FK_TherapyIteration_Robots_TreatingStaffId",
                table: "TherapyIteration");

            migrationBuilder.DropForeignKey(
                name: "FK_TherapyIteration_Stays_StayId",
                table: "TherapyIteration");

            migrationBuilder.DropForeignKey(
                name: "FK_TherapyIteration_Therapies_TherapyId",
                table: "TherapyIteration");

            migrationBuilder.DropForeignKey(
                name: "FK_TherapyIteration_TimeTableEntries_TimeTableEntryId",
                table: "TherapyIteration");

            migrationBuilder.DropForeignKey(
                name: "FK_TherapyIteration_Users_ResponsableStaffId",
                table: "TherapyIteration");

            migrationBuilder.DropIndex(
                name: "IX_RobotHealthMessage_RoomId",
                table: "RobotHealthMessage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TherapyIteration",
                table: "TherapyIteration");

            migrationBuilder.DropIndex(
                name: "IX_TherapyIteration_ResponsableStaffId",
                table: "TherapyIteration");

            migrationBuilder.DropIndex(
                name: "IX_TherapyIteration_TreatingStaffId",
                table: "TherapyIteration");

            migrationBuilder.DropColumn(
                name: "RobotState",
                table: "RobotHealthMessage");

            migrationBuilder.DropColumn(
                name: "Skipped",
                table: "RobotHealthMessage");

            migrationBuilder.DropColumn(
                name: "ResponsableStaffId",
                table: "TherapyIteration");

            migrationBuilder.DropColumn(
                name: "TreatingStaffId",
                table: "TherapyIteration");

            migrationBuilder.RenameTable(
                name: "TherapyIteration",
                newName: "TherapyIterations");

            migrationBuilder.RenameColumn(
                name: "TherapyIterationId",
                table: "RobotHealthMessage",
                newName: "TimeTableId");

            migrationBuilder.RenameColumn(
                name: "RoomId",
                table: "RobotHealthMessage",
                newName: "RobotHealthMessageStatus");

            migrationBuilder.RenameIndex(
                name: "IX_RobotHealthMessage_TherapyIterationId",
                table: "RobotHealthMessage",
                newName: "IX_RobotHealthMessage_TimeTableId");

            migrationBuilder.RenameIndex(
                name: "IX_TherapyIteration_TimeTableEntryId",
                table: "TherapyIterations",
                newName: "IX_TherapyIterations_TimeTableEntryId");

            migrationBuilder.RenameIndex(
                name: "IX_TherapyIteration_TherapyId",
                table: "TherapyIterations",
                newName: "IX_TherapyIterations_TherapyId");

            migrationBuilder.RenameIndex(
                name: "IX_TherapyIteration_StayId",
                table: "TherapyIterations",
                newName: "IX_TherapyIterations_StayId");

            migrationBuilder.AddColumn<int>(
                name: "RobotId",
                table: "TimeTableEntries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "TimeTableEntries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "MedicineId",
                table: "Therapies",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TimesDone",
                table: "Therapies",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.AlterColumn<int>(
                name: "TimeTableEntryId",
                table: "TherapyIterations",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TherapyIterations",
                table: "TherapyIterations",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_TimeTableEntries_RobotId",
                table: "TimeTableEntries",
                column: "RobotId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeTableEntries_UserId",
                table: "TimeTableEntries",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_RobotHealthMessage_TherapyIterations_TimeTableId",
                table: "RobotHealthMessage",
                column: "TimeTableId",
                principalTable: "TherapyIterations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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

            migrationBuilder.AddForeignKey(
                name: "FK_TherapyIterations_Stays_StayId",
                table: "TherapyIterations",
                column: "StayId",
                principalTable: "Stays",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TherapyIterations_Therapies_TherapyId",
                table: "TherapyIterations",
                column: "TherapyId",
                principalTable: "Therapies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TherapyIterations_TimeTableEntries_TimeTableEntryId",
                table: "TherapyIterations",
                column: "TimeTableEntryId",
                principalTable: "TimeTableEntries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTableEntries_Robots_RobotId",
                table: "TimeTableEntries",
                column: "RobotId",
                principalTable: "Robots",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeTableEntries_Users_UserId",
                table: "TimeTableEntries",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RobotHealthMessage_TherapyIterations_TimeTableId",
                table: "RobotHealthMessage");

            migrationBuilder.DropForeignKey(
                name: "FK_Stays_Patients_PatientId",
                table: "Stays");

            migrationBuilder.DropForeignKey(
                name: "FK_Stays_Rooms_RoomId",
                table: "Stays");

            migrationBuilder.DropForeignKey(
                name: "FK_Therapies_Medicines_MedicineId",
                table: "Therapies");

            migrationBuilder.DropForeignKey(
                name: "FK_TherapyIterations_Stays_StayId",
                table: "TherapyIterations");

            migrationBuilder.DropForeignKey(
                name: "FK_TherapyIterations_Therapies_TherapyId",
                table: "TherapyIterations");

            migrationBuilder.DropForeignKey(
                name: "FK_TherapyIterations_TimeTableEntries_TimeTableEntryId",
                table: "TherapyIterations");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeTableEntries_Robots_RobotId",
                table: "TimeTableEntries");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeTableEntries_Users_UserId",
                table: "TimeTableEntries");

            migrationBuilder.DropIndex(
                name: "IX_TimeTableEntries_RobotId",
                table: "TimeTableEntries");

            migrationBuilder.DropIndex(
                name: "IX_TimeTableEntries_UserId",
                table: "TimeTableEntries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TherapyIterations",
                table: "TherapyIterations");

            migrationBuilder.DropColumn(
                name: "RobotId",
                table: "TimeTableEntries");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TimeTableEntries");

            migrationBuilder.DropColumn(
                name: "TimesDone",
                table: "Therapies");

            migrationBuilder.RenameTable(
                name: "TherapyIterations",
                newName: "TherapyIteration");

            migrationBuilder.RenameColumn(
                name: "TimeTableId",
                table: "RobotHealthMessage",
                newName: "TherapyIterationId");

            migrationBuilder.RenameColumn(
                name: "RobotHealthMessageStatus",
                table: "RobotHealthMessage",
                newName: "RoomId");

            migrationBuilder.RenameIndex(
                name: "IX_RobotHealthMessage_TimeTableId",
                table: "RobotHealthMessage",
                newName: "IX_RobotHealthMessage_TherapyIterationId");

            migrationBuilder.RenameIndex(
                name: "IX_TherapyIterations_TimeTableEntryId",
                table: "TherapyIteration",
                newName: "IX_TherapyIteration_TimeTableEntryId");

            migrationBuilder.RenameIndex(
                name: "IX_TherapyIterations_TherapyId",
                table: "TherapyIteration",
                newName: "IX_TherapyIteration_TherapyId");

            migrationBuilder.RenameIndex(
                name: "IX_TherapyIterations_StayId",
                table: "TherapyIteration",
                newName: "IX_TherapyIteration_StayId");

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

            migrationBuilder.AddColumn<int>(
                name: "RobotState",
                table: "RobotHealthMessage",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Skipped",
                table: "RobotHealthMessage",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<int>(
                name: "TimeTableEntryId",
                table: "TherapyIteration",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "ResponsableStaffId",
                table: "TherapyIteration",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TreatingStaffId",
                table: "TherapyIteration",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TherapyIteration",
                table: "TherapyIteration",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_RobotHealthMessage_RoomId",
                table: "RobotHealthMessage",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_TherapyIteration_ResponsableStaffId",
                table: "TherapyIteration",
                column: "ResponsableStaffId");

            migrationBuilder.CreateIndex(
                name: "IX_TherapyIteration_TreatingStaffId",
                table: "TherapyIteration",
                column: "TreatingStaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_RobotHealthMessage_Rooms_RoomId",
                table: "RobotHealthMessage",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RobotHealthMessage_TherapyIteration_TherapyIterationId",
                table: "RobotHealthMessage",
                column: "TherapyIterationId",
                principalTable: "TherapyIteration",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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

            migrationBuilder.AddForeignKey(
                name: "FK_TherapyIteration_Robots_TreatingStaffId",
                table: "TherapyIteration",
                column: "TreatingStaffId",
                principalTable: "Robots",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TherapyIteration_Stays_StayId",
                table: "TherapyIteration",
                column: "StayId",
                principalTable: "Stays",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TherapyIteration_Therapies_TherapyId",
                table: "TherapyIteration",
                column: "TherapyId",
                principalTable: "Therapies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TherapyIteration_TimeTableEntries_TimeTableEntryId",
                table: "TherapyIteration",
                column: "TimeTableEntryId",
                principalTable: "TimeTableEntries",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TherapyIteration_Users_ResponsableStaffId",
                table: "TherapyIteration",
                column: "ResponsableStaffId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
