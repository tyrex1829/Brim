/*
  Warnings:

  - You are about to drop the column `description` on the `brains` table. All the data in the column will be lost.
  - You are about to drop the column `shareableLink` on the `brains` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `brains` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."brains" DROP COLUMN "description",
DROP COLUMN "shareableLink",
DROP COLUMN "title";
