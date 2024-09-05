import Admin from "../models/admins.js";
import jwt from "jsonwebtoken";

// Create a new Admin
export const createAdmin = async (req, res) => {
  const { username, password, location } = req.body;
  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const newAdmin = new Admin({
      username,
      password, // Password will be stored in plain text since hashing was removed
      location,
    });

    // Save the admin to the database
    await newAdmin.save();

    // Generate a JWT token
    const token = jwt.sign(
      { adminId: newAdmin._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ token, message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed. Please try again later." });
  }
};

// Get (Search) Admin by username from the body
export const getAdminByUsername = async (req, res) => {
  try {
    const { username } = req.body; // Get username from the request body
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an Admin by username from the body
export const updateAdmin = async (req, res) => {
  const { username, newUsername, newPassword, newLocation } = req.body; // Get username and other data from the body

  try {
    const updatedAdmin = await Admin.findOneAndUpdate(
      { username },
      { username: newUsername, password: newPassword, location: newLocation },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: "Update failed. Please try again later." });
  }
};

// Delete an Admin by username from the body
export const deleteAdminByUsername = async (req, res) => {
  const { username } = req.body; // Get username from the body

  try {
    const deletedAdmin = await Admin.findOneAndDelete({ username });

    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
