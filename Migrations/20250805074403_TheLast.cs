using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RegionServicesapi.Migrations
{
    /// <inheritdoc />
    public partial class TheLast : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "76c96fc3-45d7-4423-b34a-6e22b5739405");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9b6ad8e6-8db2-4d22-b987-524640f9ba5e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a1f8d5fb-5edf-4f70-baa6-f2550439d1b6");

            migrationBuilder.AddColumn<string>(
                name: "userId",
                table: "Services",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3a183d04-d6a9-464b-b048-6d08536dd8af", null, "helper", "HELPER" },
                    { "949a91a9-102e-46c6-bc71-17cfe68a82b6", null, "Admin", "ADMIN" },
                    { "aa38124a-eb51-4a5f-9c5e-c3e16a55fda9", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Services_userId",
                table: "Services",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_Services_AspNetUsers_userId",
                table: "Services",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Services_AspNetUsers_userId",
                table: "Services");

            migrationBuilder.DropIndex(
                name: "IX_Services_userId",
                table: "Services");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3a183d04-d6a9-464b-b048-6d08536dd8af");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "949a91a9-102e-46c6-bc71-17cfe68a82b6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aa38124a-eb51-4a5f-9c5e-c3e16a55fda9");

            migrationBuilder.DropColumn(
                name: "userId",
                table: "Services");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "76c96fc3-45d7-4423-b34a-6e22b5739405", null, "helper", "HELPER" },
                    { "9b6ad8e6-8db2-4d22-b987-524640f9ba5e", null, "User", "USER" },
                    { "a1f8d5fb-5edf-4f70-baa6-f2550439d1b6", null, "Admin", "ADMIN" }
                });
        }
    }
}
