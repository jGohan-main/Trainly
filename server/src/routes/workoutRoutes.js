import express from "express";
import {
    createWorkout,
    getWorkoutsByExerciseDate,
    updateWorkout,
    deleteWorkout,
} from "../controllers/workoutController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", requireAuth, createWorkout);
router.get("/:exerciseDateId", requireAuth, getWorkoutsByExerciseDate);
router.put("/:id", requireAuth, updateWorkout);
router.delete("/:id", requireAuth, deleteWorkout);

export default router;