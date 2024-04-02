/*
  Warnings:

  - Added the required column `topicId` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "topicId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
