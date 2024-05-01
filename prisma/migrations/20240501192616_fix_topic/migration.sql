-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "topicId" DROP DEFAULT;
DROP SEQUENCE "Question_topicId_seq";
