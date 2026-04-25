using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RegionServicesapi.Migrations
{
    /// <inheritdoc />
    public partial class MIGEE : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "CompanyLogo",
                table: "QuotationRequests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "05e24841-c76f-4d83-954b-0e533526bab1", null, "Admin", "ADMIN" },
                    { "0c63de7b-4488-4e78-8fba-c2a67ce6afa2", null, "User", "USER" },
                    { "7b457d8c-d2c8-486e-80bc-606f299903cb", null, "Company", "COMPANY" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "05e24841-c76f-4d83-954b-0e533526bab1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0c63de7b-4488-4e78-8fba-c2a67ce6afa2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7b457d8c-d2c8-486e-80bc-606f299903cb");

            migrationBuilder.DropColumn(
                name: "CompanyLogo",
                table: "QuotationRequests");

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
    }
}
