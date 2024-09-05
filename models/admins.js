import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Store plain text password (Not recommended in production)
  location: { type: String, required: true },
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
