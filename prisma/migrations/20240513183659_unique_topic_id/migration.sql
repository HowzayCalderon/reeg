/*
  Warnings:

  - A unique constraint covering the columns `[topicId]` on the table `TopicPerformance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TopicPerformance_topicId_key" ON "TopicPerformance"("topicId");
