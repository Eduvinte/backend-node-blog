/*
  Warnings:

  - You are about to drop the column `foto` on the `Post` table. All the data in the column will be lost.
  - Added the required column `picture` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "foto",
ADD COLUMN     "picture" TEXT NOT NULL;
