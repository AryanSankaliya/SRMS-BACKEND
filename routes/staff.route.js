const express = require("express");
const router = express.Router();
// Service exports: getAll, getById, insert, update, deleteById, login
const {
    getAll,
    getById,
    insert,
    update,
    deleteById,
    login
} = require("../services/staff.service");

// 1. GET ALL
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

// 2. GET BY ID
router.get("/:id", async (req, res) => {
    try {
        const result = await getById(req.params.id);
        if (result.error) {
            return res.status(500).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }
});

// 3. INSERT (Register)
router.post("/", async (req, res) => {
    try {
        const result = await insert(req.body);
        if (result.error) {
            return res.status(500).json(result);
        }
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }
});

// 4. UPDATE
router.put("/:id", async (req, res) => {
    try {
        const result = await update(req.params.id, req.body);
        if (result.error) {
            return res.status(500).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }
});

// 5. DELETE
router.delete("/:id", async (req, res) => {
    try {
        const result = await deleteById(req.params.id);
        if (result.error) {
            return res.status(500).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }
});

// 6. LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: true, message: "Email and Password are required" });
        }
        const result = await login(email, password);
        if (result.error) {
            return res.status(401).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }
});

module.exports = router;
