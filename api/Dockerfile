FROM mcr.microsoft.com/dotnet/sdk:10.0 AS builder
ARG informationalversion=unpublished

COPY src/ ./src/

RUN dotnet publish src/PlantWatery.Api -c Release -p:InformationalVersion=${informationalversion} -o /app 

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app
COPY --from=builder app/ .
EXPOSE 80
EXPOSE 9090
ENTRYPOINT ["dotnet", "PlantWatery.Api.dll"]
