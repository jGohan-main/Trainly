import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const app = express();

// allow React to call this API
app.use(cors({ origin: "http://localhost:5173" })); // change to 3000 if CRA
app.use(express.json());

// guard: make sure env loaded
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL missing in .env");
}

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

app.get("/", (req, res) => {
    res.send("Server works");
});

// Sign up user
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { email, passwordHash: hashedPassword },
            select: { id: true, email: true }, // ✅ don’t return hash
        });


        return res.status(201).json({ message: "User created", user });
    } catch (error) {
        // ✅ if email already exists (unique constraint)
        if (error?.code === "P2002") {
            return res.status(409).json({ error: "User already exists" });
        }

        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});

// Login user
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const ok = await bcrypt.compare(password, user.passwordHash);

        if (!ok) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        console.log("okidokie")
        return res.json({ message: "Logged in", user: { id: user.id, email: user.email } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});

// Create task
app.post("/tasks", async (req, res) => {
    const { title, userId } = req.body;

    if (!title || !userId) {
        return res.status(400).json({ error: "Missing title or userId" });
    }

    try {
        const task = await prisma.task.create({
            data: {
                title,
                userId,
            },
        });

        res.status(201).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get task
app.get("/tasks", async (req, res) => {
    const userId = Number(req.query.userId);

    if (!userId) {
        return res.status(400).json({ error: "Missing or invalid userId" });
    }

    try {
        const tasks = await prisma.task.findMany({
            where: { userId },
            orderBy: { id: "desc" }, // optional
        });

        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

console.log("DATABASE_URL:", process.env.DATABASE_URL);