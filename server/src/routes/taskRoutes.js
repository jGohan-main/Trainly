import express from "express";
import {
    createTask,
    getTasks,
    deleteTask,
    updateTask,
    toggleTaskDone,
    getDoneTasks,
    archiveDoneTasks,
    getTodoTasks,
} from "../controllers/taskController.js";

import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", requireAuth, createTask);
router.get("/", requireAuth, getTasks);
router.delete("/:id", requireAuth, deleteTask);
router.put("/:id", requireAuth, updateTask);
router.patch("/:id", requireAuth, toggleTaskDone);

router.get("/done", requireAuth, getDoneTasks);
router.post("/archive", requireAuth, archiveDoneTasks);
router.get("/todo", requireAuth, getTodoTasks);

export default router;