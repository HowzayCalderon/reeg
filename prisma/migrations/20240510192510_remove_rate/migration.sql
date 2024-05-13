/*
  Warnings:

  - You are about to drop the column `attemps` on the `TopicPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `TopicPerformance` table. All the data in the column will be lost.
  - Added the required column `attempts` to the `TopicPerformance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TopicPerformance" DROP COLUMN "attemps",
DROP COLUMN "rate",
ADD COLUMN     "attempts" INTEGER NOT NULL;
