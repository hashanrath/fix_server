import express from "express";
import { createAdmin, getAdminByUsername, updateAdmin, deleteAdminByUsername } from "../controlles/admins.js";

const router = express.Router();

// Create a new Admin
router.post("/add", createAdmin);

// Get Admin by username
router.post("/get", getAdminByUsername);

// Update Admin details
router.put("/update", updateAdmin);

// Delete Admin
router.delete("/delete", deleteAdminByUsername);

export default router;
