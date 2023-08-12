/*
  Warnings:

  - You are about to drop the column `date` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `activityDate` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "date",
ADD COLUMN     "activityDate" TIMESTAMP(3) NOT NULL;
