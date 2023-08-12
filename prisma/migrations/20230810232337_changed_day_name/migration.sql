/*
  Warnings:

  - You are about to drop the column `activityDate` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `day` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "activityDate",
ADD COLUMN     "day" TIMESTAMP(3) NOT NULL;
