﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using bnl_dark_api.DataBase;

#nullable disable

namespace bnl_dark_api.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20220610182100_Added_I_Dont_Even_Know_Anymore")]
    partial class Added_I_Dont_Even_Know_Anymore
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("bnl_dark_api.Models.AnamnesisRecord", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("PatientId")
                        .HasColumnType("int");

                    b.Property<int>("StayId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PatientId");

                    b.HasIndex("StayId");

                    b.ToTable("AnamnesisRecords");
                });

            modelBuilder.Entity("bnl_dark_api.Models.Medicine", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("AmountPerDay")
                        .HasColumnType("int");

                    b.Property<int>("Dispenser")
                        .HasColumnType("int");

                    b.Property<string>("LatinName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MedicineType")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Dispenser")
                        .IsUnique();

                    b.ToTable("Medicines");
                });

            modelBuilder.Entity("bnl_dark_api.Models.Patient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTimeOffset>("Birthday")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("Firstname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SocialSecurityNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("bnl_dark_api.Models.Robot", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Robots");
                });

            modelBuilder.Entity("bnl_dark_api.Models.RobotHealthMessage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTimeOffset>("Received")
                        .HasColumnType("datetimeoffset");

                    b.Property<int>("RobotHealthMessageStatus")
                        .HasColumnType("int");

                    b.Property<int?>("RobotId")
                        .HasColumnType("int");

                    b.Property<int>("TimeTableId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RobotId");

                    b.HasIndex("TimeTableId");

                    b.ToTable("RobotHealthMessage");
                });

            modelBuilder.Entity("bnl_dark_api.Models.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("Floor")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("bnl_dark_api.Models.Stay", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTimeOffset>("Enter")
                        .HasColumnType("datetimeoffset");

                    b.Property<DateTimeOffset>("Leave")
                        .HasColumnType("datetimeoffset");

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.Property<string>("Reason")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoomId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PatientId");

                    b.HasIndex("RoomId");

                    b.ToTable("Stays");
                });

            modelBuilder.Entity("bnl_dark_api.Models.Therapy", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("AnamnesisRecordId")
                        .HasColumnType("int");

                    b.Property<int>("MedicineAmountPerIteration")
                        .HasColumnType("int");

                    b.Property<int>("MedicineId")
                        .HasColumnType("int");

                    b.Property<int>("TimesDone")
                        .HasColumnType("int");

                    b.Property<int>("TotalTimesToBeHealed")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AnamnesisRecordId");

                    b.HasIndex("MedicineId");

                    b.ToTable("Therapies");
                });

            modelBuilder.Entity("bnl_dark_api.Models.TherapyIteration", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("StayId")
                        .HasColumnType("int");

                    b.Property<int>("TherapyId")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("TimeDone")
                        .HasColumnType("datetimeoffset");

                    b.Property<int>("TimeTableEntryId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StayId");

                    b.HasIndex("TherapyId");

                    b.HasIndex("TimeTableEntryId");

                    b.ToTable("TherapyIterations");
                });

            modelBuilder.Entity("bnl_dark_api.Models.TimeTableEntry", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("RobotId")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("StartTime")
                        .HasColumnType("datetimeoffset");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RobotId");

                    b.HasIndex("UserId");

                    b.ToTable("TimeTableEntries");
                });

            modelBuilder.Entity("bnl_dark_api.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("JobDescription")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordResetToken")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("bnl_dark_api.Models.AnamnesisRecord", b =>
                {
                    b.HasOne("bnl_dark_api.Models.Patient", null)
                        .WithMany("Anamnesis")
                        .HasForeignKey("PatientId");

                    b.HasOne("bnl_dark_api.Models.Stay", "Stay")
                        .WithMany()
                        .HasForeignKey("StayId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Stay");
                });

            modelBuilder.Entity("bnl_dark_api.Models.RobotHealthMessage", b =>
                {
                    b.HasOne("bnl_dark_api.Models.Robot", null)
                        .WithMany("RobotHealthMessages")
                        .HasForeignKey("RobotId");

                    b.HasOne("bnl_dark_api.Models.TherapyIteration", "TherapyIteration")
                        .WithMany()
                        .HasForeignKey("TimeTableId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TherapyIteration");
                });

            modelBuilder.Entity("bnl_dark_api.Models.Stay", b =>
                {
                    b.HasOne("bnl_dark_api.Models.Patient", "Patient")
                        .WithMany()
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("bnl_dark_api.Models.Room", "Room")
                        .WithMany()
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Patient");

                    b.Navigation("Room");
                });

            modelBuilder.Entity("bnl_dark_api.Models.Therapy", b =>
                {
                    b.HasOne("bnl_dark_api.Models.AnamnesisRecord", null)
                        .WithMany("Therapies")
                        .HasForeignKey("AnamnesisRecordId");

                    b.HasOne("bnl_dark_api.Models.Medicine", "Medicine")
                        .WithMany()
                        .HasForeignKey("MedicineId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Medicine");
                });

            modelBuilder.Entity("bnl_dark_api.Models.TherapyIteration", b =>
                {
                    b.HasOne("bnl_dark_api.Models.Stay", "Stay")
                        .WithMany()
                        .HasForeignKey("StayId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("bnl_dark_api.Models.Therapy", "Therapy")
                        .WithMany("TherapyIterationsPlaned")
                        .HasForeignKey("TherapyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("bnl_dark_api.Models.TimeTableEntry", "TimeTableEntry")
                        .WithMany("TherapyIterations")
                        .HasForeignKey("TimeTableEntryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Stay");

                    b.Navigation("Therapy");

                    b.Navigation("TimeTableEntry");
                });

            modelBuilder.Entity("bnl_dark_api.Models.TimeTableEntry", b =>
                {
                    b.HasOne("bnl_dark_api.Models.Robot", "Robot")
                        .WithMany()
                        .HasForeignKey("RobotId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("bnl_dark_api.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Robot");

                    b.Navigation("User");
                });

            modelBuilder.Entity("bnl_dark_api.Models.AnamnesisRecord", b =>
                {
                    b.Navigation("Therapies");
                });

            modelBuilder.Entity("bnl_dark_api.Models.Patient", b =>
                {
                    b.Navigation("Anamnesis");
                });

            modelBuilder.Entity("bnl_dark_api.Models.Robot", b =>
                {
                    b.Navigation("RobotHealthMessages");
                });

            modelBuilder.Entity("bnl_dark_api.Models.Therapy", b =>
                {
                    b.Navigation("TherapyIterationsPlaned");
                });

            modelBuilder.Entity("bnl_dark_api.Models.TimeTableEntry", b =>
                {
                    b.Navigation("TherapyIterations");
                });
#pragma warning restore 612, 618
        }
    }
}