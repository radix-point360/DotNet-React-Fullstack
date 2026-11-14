# .NET React CRUD

## Local SQL Server

The database runs in Docker and is exposed only on localhost. Its data is kept in
a named Docker volume between container restarts.

1. Configure `.env`.
2. Set `MSSQL_SA_PASSWORD` in `.env` to a strong password that meets SQL Server's
   password complexity requirements.
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

## Run the full stack with Docker

Build and start SQL Server, the API, and the React client:

```bash
docker compose up --build -d
docker compose ps
```

Open the client at `http://localhost:5173`; the API and Swagger UI are available
at `http://localhost:5200`. The API applies EF Core migrations automatically
when started by this local Compose configuration. This setting is intended for
local development only; production deployments should apply migrations as a
separate controlled step.

Stop the stack with `docker compose down`. The SQL Server volume is preserved.

## Run the API locally

Store the same SQL Server password from `.env` in .NET user secrets:

```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" \
  'Server=localhost,1433;Database=CRUDdb;User Id=sa;Password=YOUR_SA_PASSWORD;TrustServerCertificate=True' \
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
