import express from "express";
import {
    createExerciseDate,
    getExerciseDates,
    updateExerciseDate,
    deleteExerciseDate,
} from "../controllers/exerciseController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, getExerciseDates);
router.post("/", requireAuth, createExerciseDate);

// ✅ NEW ROUTES
router.put("/:id", requireAuth, updateExerciseDate);
router.delete("/:id", requireAuth, deleteExerciseDate);

export default router;