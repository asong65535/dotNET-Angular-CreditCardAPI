-- Create the database if it doesn't exist
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'PaymentDB')
BEGIN
    CREATE DATABASE PaymentDB;
END
GO

USE PaymentDB;
GO

-- Create the PaymentDetails table if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'PaymentDetails')
BEGIN
CREATE TABLE PaymentDetails (
                                PaymentDetailId INT PRIMARY KEY IDENTITY(1,1),
                                CardOwnerName NVARCHAR(100) NOT NULL,
                                CardNumber NVARCHAR(16) NOT NULL,
                                ExpirationDate NVARCHAR(5) NOT NULL,
                                SecurityCode NVARCHAR(3) NOT NULL
);
END
GO

-- Insert some sample data
IF NOT EXISTS (SELECT TOP 1 PaymentDetailId FROM PaymentDetails)
BEGIN
INSERT INTO PaymentDetails (CardOwnerName, CardNumber, ExpirationDate, SecurityCode)
VALUES
    ('John Doe', '4111111111111111', '12/25', '123'),
    ('Jane Smith', '5555555555554444', '10/26', '456');
END
GO