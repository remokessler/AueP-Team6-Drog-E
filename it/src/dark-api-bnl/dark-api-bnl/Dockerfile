FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y \
        nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /src
COPY ["dark-api-bnl/dark-api-bnl.csproj", "dark-api-bnl/"]
RUN dotnet restore "dark-api-bnl/dark-api-bnl.csproj"
COPY . .
WORKDIR "/src/dark-api-bnl"
RUN dotnet build "dark-api-bnl.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "dark-api-bnl.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "dark-api-bnl.dll"]
