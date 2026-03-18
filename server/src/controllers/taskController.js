import prisma from "../config/db.js";

export async function createTask(req, res) {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Missing title" });
    }

    try {
        const task = await prisma.task.create({
            data: {
                title,
                userId: req.userId
            },
        });

        return res.status(201).json(task);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export async function getTasks(req, res) {
    try {
        const tasks = await prisma.task.findMany({
            where: { userId: req.userId },
            orderBy: { id: "desc" },
        });

        return res.json(tasks);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export async function deleteTask(req, res) {
    const taskId = Number(req.params.id);

    try {
        await prisma.task.delete({
            where: { id: taskId },
        });

        return res.json({ message: "Task deleted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export async function updateTask(req, res) {
    const taskId = Number(req.params.id);
    const { title } = req.body;

    try {
        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: { title },
        });

        return res.json(updatedTask);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export async function toggleTaskDone(req, res) {
    const id = Number(req.params.id);
    const { isDone } = req.body;

    try {
        const task = await prisma.task.update({
            where: { id },
            data: {
                isDone: Boolean(isDone),
                doneAt: isDone ? new Date() : null,
            },
        });

        return res.json(task);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export async function getDoneTasks(req, res) {
    try {
        const done = await prisma.task.findMany({
            where: { userId: req.userId, isDone: true },
            orderBy: { doneAt: "desc" },
        });

        return res.json(done);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export async function archiveDoneTasks(req, res) {
    try {
        const result = await prisma.$transaction(async (tx) => {
            const doneTasks = await tx.task.findMany({
                where: { userId: req.userId, isDone: true },
            });

            if (doneTasks.length === 0) {
                return { moved: 0 };
            }

            await tx.taskHistory.createMany({
                data: doneTasks.map((t) => ({
                    title: t.title,
                    userId: t.userId,
                    createdAt: t.createdAt,
                    doneAt: t.doneAt ?? new Date(),
                })),
            });

            await tx.task.deleteMany({
                where: { userId: req.userId, isDone: true },
            });

            return { moved: doneTasks.length };
        });

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

export async function getTodoTasks(req, res) {
    try {
        const todo = await prisma.task.findMany({
            where: { userId: req.userId, isDone: false },
            orderBy: { createdAt: "desc" },
        });

        return res.json(todo);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}