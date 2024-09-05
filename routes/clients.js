import express from "express";
import { addClient, getClientByEmail, updateClient, deleteClientByEmail } from "../controlles/clients.js";

const router = express.Router();

// Create a new client
router.post("/add", addClient);

// Get client by email (from the body)
router.post("/get", getClientByEmail);

// Update client by email (from the body)
router.put("/update", updateClient);

// Delete client by email (from the body)
router.delete("/delete", deleteClientByEmail);

export default router;
