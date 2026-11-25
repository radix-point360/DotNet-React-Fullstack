using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class updatetokentable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "replaced_by_token",
                schema: "public",
                table: "refresh_tokens",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "revoked_at",
                schema: "public",
                table: "refresh_tokens",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "token_family_id",
                schema: "public",
                table: "refresh_tokens",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "replaced_by_token",
                schema: "public",
                table: "refresh_tokens");

            migrationBuilder.DropColumn(
                name: "revoked_at",
                schema: "public",
                table: "refresh_tokens");

            migrationBuilder.DropColumn(
                name: "token_family_id",
                schema: "public",
                table: "refresh_tokens");
        }
    }
}
