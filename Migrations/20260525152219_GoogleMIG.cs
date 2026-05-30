using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RegionServicesapi.Migrations
{
    /// <inheritdoc />
    public partial class GoogleMIG : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "22e83a50-d872-4fdd-9b9d-46401b6807af");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a286c2a2-5454-4d7a-a266-5fd4f630da8c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ad124d03-3fee-4b76-b20d-88f96c53aea6");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "aed52eb3-fdde-440f-85e1-6e42af0d1d46", null, "User", "USER" },
                    { "d9584a83-8d9c-48e3-97ce-398a793bc404", null, "Admin", "ADMIN" },
                    { "e1aeab5a-a9f4-491f-a0b8-6a76d341122f", null, "Company", "COMPANY" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aed52eb3-fdde-440f-85e1-6e42af0d1d46");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d9584a83-8d9c-48e3-97ce-398a793bc404");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e1aeab5a-a9f4-491f-a0b8-6a76d341122f");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "22e83a50-d872-4fdd-9b9d-46401b6807af", null, "User", "USER" },
                    { "a286c2a2-5454-4d7a-a266-5fd4f630da8c", null, "Admin", "ADMIN" },
                    { "ad124d03-3fee-4b76-b20d-88f96c53aea6", null, "Company", "COMPANY" }
                });
        }
    }
}
