import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
    createAccount,
    getAccounts,
    deleteAccount,
    updateAccount
} from "../controllers/accountsController.js";

const router = express.Router();

router.post("/", requireAuth, createAccount);
router.get("/", requireAuth, getAccounts);
router.put("/:id", requireAuth, updateAccount); // ✅ EDIT ACCOUNT
router.delete("/:id", requireAuth, deleteAccount);

export default router;