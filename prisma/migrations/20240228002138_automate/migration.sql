-- AlterTable
CREATE SEQUENCE answer_id_seq;
ALTER TABLE "Answer" ALTER COLUMN "id" SET DEFAULT nextval('answer_id_seq');
ALTER SEQUENCE answer_id_seq OWNED BY "Answer"."id";

-- AlterTable
CREATE SEQUENCE class_id_seq;
ALTER TABLE "Class" ALTER COLUMN "id" SET DEFAULT nextval('class_id_seq');
ALTER SEQUENCE class_id_seq OWNED BY "Class"."id";

-- AlterTable
CREATE SEQUENCE question_id_seq;
ALTER TABLE "Question" ALTER COLUMN "id" SET DEFAULT nextval('question_id_seq');
ALTER SEQUENCE question_id_seq OWNED BY "Question"."id";

-- AlterTable
CREATE SEQUENCE subject_id_seq;
ALTER TABLE "Subject" ALTER COLUMN "id" SET DEFAULT nextval('subject_id_seq');
ALTER SEQUENCE subject_id_seq OWNED BY "Subject"."id";
