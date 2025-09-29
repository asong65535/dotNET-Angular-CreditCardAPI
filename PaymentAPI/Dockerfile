FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["PaymentAPI/PaymentAPI.csproj", "PaymentAPI/"]
RUN dotnet restore "PaymentAPI/PaymentAPI.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/PaymentAPI"
RUN dotnet build "PaymentAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PaymentAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final stage/image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Create appsettings.json file
RUN echo '{\
  "Logging": {\
    "LogLevel": {\
      "Default": "Information",\
      "Microsoft.AspNetCore": "Warning"\
    }\
  },\
  "AllowedHosts": "*",\
  "ConnectionStrings": {\
    "DevConnection": "Server=mssql-service;Database=PaymentDB;User Id=sa;Password=YourStrongPassword123;TrustServerCertificate=True"\
  }\
}' > /app/appsettings.json

ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "PaymentAPI.dll"]