FROM mcr.microsoft.com/dotnet/sdk:10.0 AS builder
ARG informationalversion=unpublished

COPY src/ ./src/

RUN dotnet publish src/PlantWatery.Api -c Release -p:InformationalVersion=${informationalversion} -o /app 

FROM mcr.microsoft.com/dotnet/aspnet:10.0.3@sha256:52dcfb4225fda614c38ba5997a4ec72cbd5260a624125174416e547ff9eb9b8c AS final

RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder app/ .
EXPOSE 80
EXPOSE 9090
ENTRYPOINT ["dotnet", "PlantWatery.Api.dll"]
