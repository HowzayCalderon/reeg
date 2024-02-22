/*
  Warnings:

  - You are about to drop the column `choice` on the `Answer` table. All the data in the column will be lost.
  - Added the required column `isCorrect` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAnswer` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "choice",
ADD COLUMN     "isCorrect" BOOLEAN NOT NULL,
ADD COLUMN     "userAnswer" TEXT NOT NULL;
