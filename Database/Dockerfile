FROM mcr.microsoft.com/mssql/server:2022-latest

# Environment variables for SQL Server
ENV ACCEPT_EULA=Y
ENV MSSQL_SA_PASSWORD=YourStrongPassword123
ENV MSSQL_PID=Developer

# Create directory structure
USER root
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy initialization files to a location we can access
COPY Database/init-db.sql /usr/src/app/init-db.sql

# Create a startup script
RUN echo '#!/bin/bash \n\
# Start SQL Server \n\
/opt/mssql/bin/sqlservr & \n\
# Wait for SQL Server to start \n\
sleep 30s \n\
# Run the initialization script \n\
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $MSSQL_SA_PASSWORD -i /usr/src/app/init-db.sql \n\
# Keep container running \n\
tail -f /dev/null' > /usr/src/app/entrypoint.sh \
    && chmod +x /usr/src/app/entrypoint.sh

# Expose SQL Server port
EXPOSE 1433

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $MSSQL_SA_PASSWORD -Q "SELECT 1" || exit 1

# Switch back to mssql user for running SQL Server
USER mssql

# Set the entry point
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]