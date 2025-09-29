FROM mcr.microsoft.com/mssql/server:2022-latest

# Environment variables for SQL Server
ENV ACCEPT_EULA=Y
ENV MSSQL_SA_PASSWORD=YourStrongPassword123
ENV MSSQL_PID=Express

# Create directory for database files
RUN mkdir -p /var/opt/mssql/data

# Expose SQL Server port
EXPOSE 1433

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $MSSQL_SA_PASSWORD -Q "SELECT 1" || exit 1

# Create database and tables
COPY ./init-db.sql /docker-entrypoint-initdb.d/

# SQL Server startup script
USER mssql
CMD /opt/mssql/bin/sqlservr