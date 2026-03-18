import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import accountsRoutes from "./routes/accountsRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";

const app = express();

/* CORS must be first */
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


/* body parser */
app.use(express.json());

/* cookies for JWT */
app.use(cookieParser());

/* security headers */
app.use(helmet());

/* test route */
app.get("/", (req, res) => {
    res.send("Server works");
});

/* routes */
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/history", historyRoutes);
app.use("/accounts", accountsRoutes);
app.use("/exercise", exerciseRoutes);
app.use("/workouts", workoutRoutes);

export default app;