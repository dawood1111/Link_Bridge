using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RegionServicesapi.Migrations
{
    /// <inheritdoc />
    public partial class FifthMig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_ConstructionProjects_projectId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_projectId",
                table: "Images");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "42899a2a-f97b-4254-9d0e-c1d40c3415b2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "93918700-f3ef-4a48-a8d8-9eda3e20b919");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "af839089-9aff-479f-b984-035321640608");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cd88d072-8eee-4882-8059-dfa020101037");

            migrationBuilder.DropColumn(
                name: "projectId",
                table: "Images");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "65de2316-4dd5-4f94-9150-518132285cbb", null, "Construction", "CONSTRUCTION" },
                    { "69ebf788-73f9-4309-9f94-4b014974805d", null, "User", "USER" },
                    { "8c796f90-362a-4747-a5d5-7582ca4d9eb7", null, "Admin", "ADMIN" },
                    { "bfd538a1-4b8a-4155-9e69-d9df10ca1d92", null, "IT", "IT" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_ConstructionProjectId",
                table: "Images",
                column: "ConstructionProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_ConstructionProjects_ConstructionProjectId",
                table: "Images",
                column: "ConstructionProjectId",
                principalTable: "ConstructionProjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_ConstructionProjects_ConstructionProjectId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_ConstructionProjectId",
                table: "Images");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "65de2316-4dd5-4f94-9150-518132285cbb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "69ebf788-73f9-4309-9f94-4b014974805d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8c796f90-362a-4747-a5d5-7582ca4d9eb7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bfd538a1-4b8a-4155-9e69-d9df10ca1d92");

            migrationBuilder.AddColumn<int>(
                name: "projectId",
                table: "Images",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "42899a2a-f97b-4254-9d0e-c1d40c3415b2", null, "IT", "IT" },
                    { "93918700-f3ef-4a48-a8d8-9eda3e20b919", null, "User", "USER" },
                    { "af839089-9aff-479f-b984-035321640608", null, "Admin", "ADMIN" },
                    { "cd88d072-8eee-4882-8059-dfa020101037", null, "Construction", "CONSTRUCTION" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_projectId",
                table: "Images",
                column: "projectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_ConstructionProjects_projectId",
                table: "Images",
                column: "projectId",
                principalTable: "ConstructionProjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
