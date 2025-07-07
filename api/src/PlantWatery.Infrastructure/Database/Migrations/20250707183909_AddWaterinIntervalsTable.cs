using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlantWatery.Infrastructure.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddWaterinIntervalsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WateringIntervals",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IntervalInDays = table.Column<int>(type: "integer", nullable: false),
                    PlantId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WateringIntervals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WateringIntervals_Plants_PlantId",
                        column: x => x.PlantId,
                        principalTable: "Plants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WateringIntervals_PlantId",
                table: "WateringIntervals",
                column: "PlantId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WateringIntervals");
        }
    }
}
