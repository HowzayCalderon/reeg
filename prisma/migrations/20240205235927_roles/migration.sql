-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Teacher', 'Student', 'Admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Student';
