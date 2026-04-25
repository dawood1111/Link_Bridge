using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RegionServicesapi.Migrations
{
    /// <inheritdoc />
    public partial class MIGAAA : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "AboutCompaniesId",
                table: "QuotationRequests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1fd23fdd-c89e-4a16-91cf-1f6c97ee66b4", null, "Admin", "ADMIN" },
                    { "416ff963-1530-4cab-bf5c-c7b157d2ff5c", null, "Company", "COMPANY" },
                    { "669db87c-aa6b-4a69-bdb6-b7e9b1a85bbd", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuotationRequests_AboutCompaniesId",
                table: "QuotationRequests",
                column: "AboutCompaniesId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuotationRequests_AboutCompanies_AboutCompaniesId",
                table: "QuotationRequests",
                column: "AboutCompaniesId",
                principalTable: "AboutCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuotationRequests_AboutCompanies_AboutCompaniesId",
                table: "QuotationRequests");

            migrationBuilder.DropIndex(
                name: "IX_QuotationRequests_AboutCompaniesId",
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

            migrationBuilder.DropColumn(
                name: "AboutCompaniesId",
                table: "QuotationRequests");

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
    }
}
