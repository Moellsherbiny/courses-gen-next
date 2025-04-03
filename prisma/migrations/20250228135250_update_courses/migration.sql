/*
  Warnings:

  - You are about to drop the column `subjects` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `topics` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "subjects",
DROP COLUMN "topics";
