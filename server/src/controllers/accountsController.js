import prisma from "../config/db.js";

export async function createAccount(req, res) {
    const { name, balance, type } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    try {
        const account = await prisma.account.create({
            data: {
                name,
                balance: balance ?? 0,
                type,
                userId: req.userId
            },
        });

        return res.status(201).json(account);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export async function getAccounts(req, res) {
    try {
        const accounts = await prisma.account.findMany({
            where: { userId: req.userId },
            orderBy: { createdAt: "desc" },
        });

        return res.json(accounts);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export async function deleteAccount(req, res) {

    const id = Number(req.params.id);

    await prisma.account.delete({
        where: {
            id,
            userId: req.userId
        }
    });

    res.json({ message: "Account deleted" });
}

export const updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, balance, type } = req.body;

        const updatedAccount = await prisma.account.update({
            where: { id: Number(id) },
            data: {
                name,
                balance: Number(balance),
                type,
            },
        });

        res.json(updatedAccount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update account" });
    }
};