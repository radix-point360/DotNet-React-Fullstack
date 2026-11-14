# .NET React CRUD

## Local SQL Server

The database runs in Docker and is exposed only on localhost. Its data is kept in
a named Docker volume between container restarts.

1. Copy `.env.example` to `.env`.
2. Set `MSSQL_SA_PASSWORD` in `.env` to a strong password that meets SQL Server's
   password complexity requirements. Do not commit `.env`.
3. Start SQL Server:

   ```bash
   docker compose up -d
   ```

4. Check startup and health:

   ```bash
   docker compose ps
   docker compose logs -f database
   ```

Stop the container with `docker compose down`. The `sqlserver_data` volume is
preserved; `docker compose down -v` deletes the database data. The `CRUDdb`
database is created by the EF Core migration.

## Run the API locally

Store the same SQL Server password from `.env` in .NET user secrets:

```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" \
  'Server=localhost,1433;Database=CRUDdb;User Id=sa;Password=CRUDdbPassword123!;TrustServerCertificate=True' \
  --project "Server/CRUD Web API/CRUD Web API/CRUD Web API.csproj"
```

Install the EF Core CLI once, apply the schema, and run the API:

```bash
dotnet tool install --global dotnet-ef --version 10.0.14
ASPNETCORE_ENVIRONMENT=Development dotnet ef database update \
  --project "Server/CRUD Web API/CRUD Web API/CRUD Web API.csproj"
dotnet run --project "Server/CRUD Web API/CRUD Web API/CRUD Web API.csproj" --launch-profile http
```

The API currently supports CRUD operations for people with a required name and
email and an optional phone number. Swagger UI is available at
`http://localhost:5200/`.
