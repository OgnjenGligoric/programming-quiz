﻿// <auto-generated />
using System;
using Konteh.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Konteh.Infrastructure.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20241028082643_new-migration")]
    partial class newmigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Konteh.Domain.Answer", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long?>("ExamQuestionId")
                        .HasColumnType("bigint");

                    b.Property<bool>("IsCorrect")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<long?>("QuestionId")
                        .HasColumnType("bigint");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ExamQuestionId");

                    b.HasIndex("QuestionId");

                    b.ToTable("Answers");
                });

            modelBuilder.Entity("Konteh.Domain.Candidate", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Faculty")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Candidates");
                });

            modelBuilder.Entity("Konteh.Domain.Exam", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("CandiateId")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("EndTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CandiateId");

                    b.ToTable("Exams");
                });

            modelBuilder.Entity("Konteh.Domain.ExamQuestion", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long?>("ExamId")
                        .HasColumnType("bigint");

                    b.Property<long>("QuestionId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("ExamId");

                    b.HasIndex("QuestionId");

                    b.ToTable("ExamQuestions");
                });

            modelBuilder.Entity("Konteh.Domain.Question", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<int>("Category")
                        .HasColumnType("int");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("Konteh.Domain.Answer", b =>
                {
                    b.HasOne("Konteh.Domain.ExamQuestion", null)
                        .WithMany("SubmmitedAnswers")
                        .HasForeignKey("ExamQuestionId");

                    b.HasOne("Konteh.Domain.Question", null)
                        .WithMany("Answers")
                        .HasForeignKey("QuestionId");
                });

            modelBuilder.Entity("Konteh.Domain.Exam", b =>
                {
                    b.HasOne("Konteh.Domain.Candidate", "Candiate")
                        .WithMany()
                        .HasForeignKey("CandiateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Candiate");
                });

            modelBuilder.Entity("Konteh.Domain.ExamQuestion", b =>
                {
                    b.HasOne("Konteh.Domain.Exam", null)
                        .WithMany("ExamQuestions")
                        .HasForeignKey("ExamId");

                    b.HasOne("Konteh.Domain.Question", "Question")
                        .WithMany()
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Question");
                });

            modelBuilder.Entity("Konteh.Domain.Exam", b =>
                {
                    b.Navigation("ExamQuestions");
                });

            modelBuilder.Entity("Konteh.Domain.ExamQuestion", b =>
                {
                    b.Navigation("SubmmitedAnswers");
                });

            modelBuilder.Entity("Konteh.Domain.Question", b =>
                {
                    b.Navigation("Answers");
                });
#pragma warning restore 612, 618
        }
    }
}
