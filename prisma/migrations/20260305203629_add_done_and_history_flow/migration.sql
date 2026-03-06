/*
  Warnings:

  - You are about to drop the column `completedAt` on the `TaskHistory` table. All the data in the column will be lost.
  - Added the required column `doneAt` to the `TaskHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "doneAt" TIMESTAMP(3),
ADD COLUMN     "isDone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TaskHistory" DROP COLUMN "completedAt",
ADD COLUMN     "archivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "doneAt" TIMESTAMP(3) NOT NULL;
