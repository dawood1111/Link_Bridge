using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RegionServicesapi.Migrations
{
    /// <inheritdoc />
    public partial class MIGGAA : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuotationRequests_AboutCompanies_AboutCompaniesId",
                table: "QuotationRequests");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1fd23fdd-c89e-4a16-91cf-1f6c97ee66b4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "416ff963-1530-4cab-bf5c-c7b157d2ff5c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "669db87c-aa6b-4a69-bdb6-b7e9b1a85bbd");

            migrationBuilder.AlterColumn<int>(
                name: "AboutCompaniesId",
                table: "QuotationRequests",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "22e83a50-d872-4fdd-9b9d-46401b6807af", null, "User", "USER" },
                    { "a286c2a2-5454-4d7a-a266-5fd4f630da8c", null, "Admin", "ADMIN" },
                    { "ad124d03-3fee-4b76-b20d-88f96c53aea6", null, "Company", "COMPANY" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_QuotationRequests_AboutCompanies_AboutCompaniesId",
                table: "QuotationRequests",
                column: "AboutCompaniesId",
                principalTable: "AboutCompanies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuotationRequests_AboutCompanies_AboutCompaniesId",
                table: "QuotationRequests");

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

            migrationBuilder.AlterColumn<int>(
                name: "AboutCompaniesId",
                table: "QuotationRequests",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1fd23fdd-c89e-4a16-91cf-1f6c97ee66b4", null, "Admin", "ADMIN" },
                    { "416ff963-1530-4cab-bf5c-c7b157d2ff5c", null, "Company", "COMPANY" },
                    { "669db87c-aa6b-4a69-bdb6-b7e9b1a85bbd", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_QuotationRequests_AboutCompanies_AboutCompaniesId",
                table: "QuotationRequests",
                column: "AboutCompaniesId",
                principalTable: "AboutCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
