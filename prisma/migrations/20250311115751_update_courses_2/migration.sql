/*
  Warnings:

  - You are about to drop the `CourseVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseVideo" DROP CONSTRAINT "CourseVideo_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "videos" JSONB;

-- DropTable
DROP TABLE "CourseVideo";
