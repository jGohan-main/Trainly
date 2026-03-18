import express from "express";
import {
    getHistory,
    deleteHistoryItem,
    updateHistoryItem,
} from "../controllers/historyController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, getHistory);
router.put("/:id", requireAuth, updateHistoryItem);
router.delete("/:id", requireAuth, deleteHistoryItem);

export default router;