-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "workoutType" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exerciseDateId" INTEGER NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_exerciseDateId_fkey" FOREIGN KEY ("exerciseDateId") REFERENCES "ExerciseDate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
