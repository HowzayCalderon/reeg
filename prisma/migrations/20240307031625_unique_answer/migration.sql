/*
  Warnings:

  - A unique constraint covering the columns `[que]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Question_que_key" ON "Question"("que");
