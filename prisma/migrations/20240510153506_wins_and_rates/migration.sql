/*
  Warnings:

  - Added the required column `rate` to the `TopicPerformance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wins` to the `TopicPerformance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TopicPerformance" ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "wins" INTEGER NOT NULL;
