using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RegionServicesapi.Migrations
{
    /// <inheritdoc />
    public partial class MIHGG : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b45fe122-c6e8-4d87-85f1-3b538303fe69");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cdb6203b-2b26-41ba-9c90-2ef1fd206703");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ec8e86c3-3958-4bdc-a1b5-514ba4f80afa");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "58e1dda6-9552-4e93-abe3-8a598390b162", null, "User", "USER" },
                    { "7fdcae6c-4dd3-47fd-9b1c-83003ff16f7a", null, "Admin", "ADMIN" },
                    { "d867a432-84c1-4e20-8aab-394c942beef2", null, "Company", "COMPANY" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "58e1dda6-9552-4e93-abe3-8a598390b162");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7fdcae6c-4dd3-47fd-9b1c-83003ff16f7a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d867a432-84c1-4e20-8aab-394c942beef2");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b45fe122-c6e8-4d87-85f1-3b538303fe69", null, "Company", "COMPANY" },
                    { "cdb6203b-2b26-41ba-9c90-2ef1fd206703", null, "User", "USER" },
                    { "ec8e86c3-3958-4bdc-a1b5-514ba4f80afa", null, "Admin", "ADMIN" }
                });
        }
    }
}
