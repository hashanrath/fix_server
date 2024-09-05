import Clients from "../models/clients.js";
import jwt from "jsonwebtoken";

// Create a new client
export const addClient = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    // Check if the client already exists
    const existingClient = await Clients.findOne({ email });

    if (existingClient) {
      return res.status(400).json({ error: "Client already exists" });
    }

    const newClient = new Clients({
      name,
      email,
      phone,
    });

    // Save the client to the database
    await newClient.save();

    // Generate a JWT token
    const token = jwt.sign(
      { clientId: newClient._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ token, message: "Client created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed. Please try again later." });
  }
};

// Get (Search) client by email from the body
export const getClientByEmail = async (req, res) => {
  try {
    const { email } = req.body; // Get email from the request body
    const client = await Clients.findOne({ email });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a client by email from the body
export const updateClient = async (req, res) => {
  const { email, name, phone } = req.body; // Get email and other data from the body

  try {
    const updatedClient = await Clients.findOneAndUpdate(
      { email },
      { name, phone },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: "Update failed. Please try again later." });
  }
};

// Delete a client by email from the body
export const deleteClientByEmail = async (req, res) => {
  const { email } = req.body; // Get email from the body

  try {
    const deletedClient = await Clients.findOneAndDelete({ email });

    if (!deletedClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
