﻿// <auto-generated />
using Exemplo5ComBancoEntity.database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Exemplo4_Exercicio.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250328201650_Inicial")]
    partial class Inicial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Exemplo5ComBancoEntity.Models.Maquina", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id_Maquina");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("FkUsuario")
                        .HasColumnType("integer")
                        .HasColumnName("fk_usuario");

                    b.Property<int>("HardDisk")
                        .HasColumnType("integer")
                        .HasColumnName("hardDisk");

                    b.Property<int>("MemoriaRam")
                        .HasColumnType("integer")
                        .HasColumnName("memoria_Ram");

                    b.Property<int>("PlacaRede")
                        .HasColumnType("integer")
                        .HasColumnName("placa_Rede");

                    b.Property<string>("Tipo")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("tipo");

                    b.Property<int>("Velocidade")
                        .HasColumnType("integer")
                        .HasColumnName("velocidade");

                    b.HasKey("Id");

                    b.ToTable("maquina", (string)null);
                });

            modelBuilder.Entity("Exemplo5ComBancoEntity.Models.Software", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id_software");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("FkMaquina")
                        .HasColumnType("integer")
                        .HasColumnName("fk_maquina");

                    b.Property<int>("HardDisk")
                        .HasColumnType("integer")
                        .HasColumnName("harddisk");

                    b.Property<int>("MemoriaRam")
                        .HasColumnType("integer")
                        .HasColumnName("memoria_ram");

                    b.Property<string>("Produto")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("produto");

                    b.HasKey("Id");

                    b.ToTable("software", (string)null);
                });

            modelBuilder.Entity("Exemplo5ComBancoEntity.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id_usuario");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Especialidade")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("especialidade");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("nome_usuario");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("password");

                    b.Property<int>("Ramal")
                        .HasColumnType("integer")
                        .HasColumnName("ramal");

                    b.HasKey("Id");

                    b.ToTable("usuarios", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
