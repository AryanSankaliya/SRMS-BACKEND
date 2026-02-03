const express = require("express");
const router = express.Router();
// Service exports: getAll, getByID, insert, update, deleteById
const {
  getAll,
  getByID,
  insert,
  update,
  deleteById,
} = require("../services/ServiceDept.services");

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
    const result = await getByID(req.params.id);
    if (result.error) {
      return res.status(500).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
});

// 3. INSERT
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
// Pass id and body
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
