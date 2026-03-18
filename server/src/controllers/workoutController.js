import prisma from "../config/db.js";

export async function createWorkout(req, res) {
    const { day, workoutType, notes, month, year } = req.body;

    if (!day || !workoutType || !month || !year) {
        return res.status(400).json({
            error: "Day, workout type, month, and year are required",
        });
    }

    try {
        const exerciseDate = await prisma.exerciseDate.findFirst({
            where: {
                userId: req.userId,
                month: Number(month),
                year: Number(year),
            },
        });

        if (!exerciseDate) {
            return res.status(404).json({
                error: "Exercise month not found",
            });
        }

        const existingWorkout = await prisma.workout.findFirst({
            where: {
                exerciseDateId: exerciseDate.id,
                day: Number(day),
            },
        });

        if (existingWorkout) {
            const updatedWorkout = await prisma.workout.update({
                where: {
                    id: existingWorkout.id,
                },
                data: {
                    workoutType,
                    notes: notes || null,
                },
            });

            return res.json(updatedWorkout);
        }

        const workout = await prisma.workout.create({
            data: {
                day: Number(day),
                workoutType,
                notes: notes || null,
                exerciseDateId: exerciseDate.id,
            },
        });

        return res.status(201).json(workout);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export async function getWorkoutsByExerciseDate(req, res) {
    const exerciseDateId = Number(req.params.exerciseDateId);

    try {
        const exerciseDate = await prisma.exerciseDate.findFirst({
            where: {
                id: exerciseDateId,
                userId: req.userId,
            },
        });

        if (!exerciseDate) {
            return res.status(404).json({ error: "Exercise month not found" });
        }

        const workouts = await prisma.workout.findMany({
            where: {
                exerciseDateId,
            },
            orderBy: {
                day: "asc",
            },
        });

        return res.json(workouts);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export async function updateWorkout(req, res) {
    const id = Number(req.params.id);
    const { day, workoutType, notes } = req.body;

    try {
        const existingWorkout = await prisma.workout.findFirst({
            where: { id },
            include: {
                exerciseDate: true,
            },
        });

        if (!existingWorkout || existingWorkout.exerciseDate.userId !== req.userId) {
            return res.status(404).json({ error: "Workout not found" });
        }

        const updatedWorkout = await prisma.workout.update({
            where: { id },
            data: {
                day: day ? Number(day) : existingWorkout.day,
                workoutType: workoutType ?? existingWorkout.workoutType,
                notes: notes ?? existingWorkout.notes,
            },
        });

        return res.json(updatedWorkout);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update workout" });
    }
}

export async function deleteWorkout(req, res) {
    const id = Number(req.params.id);

    try {
        const existingWorkout = await prisma.workout.findFirst({
            where: { id },
            include: {
                exerciseDate: true,
            },
        });

        if (!existingWorkout || existingWorkout.exerciseDate.userId !== req.userId) {
            return res.status(404).json({ error: "Workout not found" });
        }

        await prisma.workout.delete({
            where: { id },
        });

        return res.json({ message: "Workout deleted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete workout" });
    }
}