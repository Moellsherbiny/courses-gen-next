-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "quiz" JSONB;
