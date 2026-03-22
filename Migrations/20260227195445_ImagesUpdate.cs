using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RegionServicesapi.Migrations
{
    /// <inheritdoc />
    public partial class ImagesUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_ConstructionProjects_ConstructionProjectId",
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

            migrationBuilder.AlterColumn<int>(
                name: "ConstructionProjectId",
                table: "Images",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0111fc2c-6c7b-499d-9ed6-d18dec1b99e6", null, "IT", "IT" },
                    { "18385022-9869-4ddb-9ba5-69968d29296f", null, "Construction", "CONSTRUCTION" },
                    { "740fb233-3f99-4698-9fbb-474359011ae9", null, "Admin", "ADMIN" },
                    { "75f14ef1-7522-4e46-aac9-90dec617c1df", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Images_ConstructionProjects_ConstructionProjectId",
                table: "Images",
                column: "ConstructionProjectId",
                principalTable: "ConstructionProjects",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_ConstructionProjects_ConstructionProjectId",
                table: "Images");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0111fc2c-6c7b-499d-9ed6-d18dec1b99e6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "18385022-9869-4ddb-9ba5-69968d29296f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "740fb233-3f99-4698-9fbb-474359011ae9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "75f14ef1-7522-4e46-aac9-90dec617c1df");

            migrationBuilder.AlterColumn<int>(
                name: "ConstructionProjectId",
                table: "Images",
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
                    { "65de2316-4dd5-4f94-9150-518132285cbb", null, "Construction", "CONSTRUCTION" },
                    { "69ebf788-73f9-4309-9f94-4b014974805d", null, "User", "USER" },
                    { "8c796f90-362a-4747-a5d5-7582ca4d9eb7", null, "Admin", "ADMIN" },
                    { "bfd538a1-4b8a-4155-9e69-d9df10ca1d92", null, "IT", "IT" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Images_ConstructionProjects_ConstructionProjectId",
                table: "Images",
                column: "ConstructionProjectId",
                principalTable: "ConstructionProjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
