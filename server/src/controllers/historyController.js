import prisma from "../config/db.js";

export async function getHistory(req, res) {
    try {
        const history = await prisma.taskHistory.findMany({
            where: { userId: req.userId },
            orderBy: { doneAt: "desc" },
        });

        return res.json(history);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export async function updateHistoryItem(req, res) {
    const id = Number(req.params.id);
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    try {
        const existing = await prisma.taskHistory.findFirst({
            where: {
                id,
                userId: req.userId,
            },
        });

        if (!existing) {
            return res.status(404).json({ error: "History item not found" });
        }

        const updatedHistoryItem = await prisma.taskHistory.update({
            where: { id },
            data: { title },
        });

        return res.json(updatedHistoryItem);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update history item" });
    }
}

export async function deleteHistoryItem(req, res) {
    const id = Number(req.params.id);

    try {
        const existing = await prisma.taskHistory.findFirst({
            where: {
                id,
                userId: req.userId,
            },
        });

        if (!existing) {
            return res.status(404).json({ error: "History item not found" });
        }

        await prisma.taskHistory.delete({
            where: { id },
        });

        return res.json({ message: "History item deleted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete history item" });
    }
}