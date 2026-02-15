const express = require("express");
const router = express.Router();
const {
    getAll,
    getById,
    insert,
    update,
    deleteById,
    getStats
} = require("../services/ServiceRequest.services");

// 0. GET STATS (Must be before /:id to avoid conflict)
router.get("/stats", async (req, res) => {
    try {
        // Expecting user info in query: ?role=HOD&userId=123
        const user = {
            role: req.query.role,
            userId: req.query.userId
        };
        const result = await getStats(user);
        if (result.error) {
            return res.status(500).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }
});

// 1. GET ALL (with optional filters in query)
router.get("/", async (req, res) => {
    try {
        const result = await getAll(req.query);
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

// 3. INSERT (POST)
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

// 4. UPDATE (PUT)
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

module.exports = router;
