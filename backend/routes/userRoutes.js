import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Create
router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read all
router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Read one
router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// Update
router.put("/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
});

// Delete
router.delete("/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
});

export default router;