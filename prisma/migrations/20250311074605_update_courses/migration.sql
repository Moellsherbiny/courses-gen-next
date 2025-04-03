/*
  Warnings:

  - You are about to drop the column `coursePrompt` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `goals` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `keywords` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `targetAudience` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "coursePrompt",
DROP COLUMN "duration",
DROP COLUMN "goals",
DROP COLUMN "keywords",
DROP COLUMN "level",
DROP COLUMN "targetAudience";
