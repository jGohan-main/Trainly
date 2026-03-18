import prisma from "../config/db.js";

export async function createExerciseDate(req, res) {
    const { month, year } = req.body;

    if (!month || !year) {
        return res.status(400).json({ error: "Month and year are required" });
    }

    const monthNumber = Number(month);
    const yearNumber = Number(year);

    if (monthNumber < 1 || monthNumber > 12) {
        return res.status(400).json({ error: "Month must be between 1 and 12" });
    }

    try {
        const existing = await prisma.exerciseDate.findFirst({
            where: {
                userId: req.userId,
                month: monthNumber,
                year: yearNumber,
            },
        });

        if (existing) {
            return res.status(200).json(existing);
        }

        const exerciseDate = await prisma.exerciseDate.create({
            data: {
                month: monthNumber,
                year: yearNumber,
                userId: req.userId,
            },
        });

        return res.status(201).json(exerciseDate);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export async function getExerciseDates(req, res) {
    try {
        const exerciseDates = await prisma.exerciseDate.findMany({
            where: { userId: req.userId },
            orderBy: [
                { year: "desc" },
                { month: "desc" },
            ],
        });

        return res.json(exerciseDates);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export async function deleteExerciseDate(req, res) {
    const id = Number(req.params.id);

    try {
        await prisma.exerciseDate.delete({
            where: { id },
        });

        return res.json({ message: "Exercise date deleted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export async function updateExerciseDate(req, res) {
    const id = Number(req.params.id);
    const { month, year } = req.body;

    try {
        const updated = await prisma.exerciseDate.update({
            where: { id },
            data: {
                month: Number(month),
                year: Number(year),
            },
        });

        return res.json(updated);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update exercise date" });
    }
}