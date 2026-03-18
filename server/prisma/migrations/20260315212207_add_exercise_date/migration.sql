-- CreateTable
CREATE TABLE "ExerciseDate" (
    "id" SERIAL NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ExerciseDate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseDate_userId_month_year_key" ON "ExerciseDate"("userId", "month", "year");

-- AddForeignKey
ALTER TABLE "ExerciseDate" ADD CONSTRAINT "ExerciseDate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
