/*
  Warnings:

  - Made the column `sendStatus` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Otp_otp_key";

-- DropIndex
DROP INDEX "User_mobileNumber_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "mobileNumber" SET DATA TYPE TEXT,
ALTER COLUMN "sendStatus" SET NOT NULL;
