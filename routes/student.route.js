const express = require("express");
const router = express.Router();
const {
    register,
    login,
    getAll,
    getById
} = require("../services/student.service");

// 1. REGISTER
router.post("/register", async (req, res) => {
    try {
        const result = await register(req.body);
        if (result.error) {
            return res.status(400).json(result);
        }
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }
});

// 2. LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: true, message: "Email and Password are required" });
        }
        const result = await login(email, password);
        if (result.error) {
            return res.status(401).json(result); // Using 401 for unauthorized
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }
});

// 3. GET ALL (Protected route ideally, but keeping simple for now)
router.get("/", async (req, res) => {
    try {
        const result = await getAll();
        if (result.error) {
            return res.status(500).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }
});

// 4. GET BY ID
router.get("/:id", async (req, res) => {
    try {
        const result = await getById(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }
});

module.exports = router;
