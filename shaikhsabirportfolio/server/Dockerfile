FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY server.csproj .
RUN dotnet restore "server.csproj"

COPY . .
RUN dotnet publish "server.csproj" -c Release -o /app/publish --no-restore /p:UseAppHost=false

# Use mcr.microsoft.com/dotnet/aspnet:10.0 for ASP.NET Core web apps/APIs
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "server.dll"]

