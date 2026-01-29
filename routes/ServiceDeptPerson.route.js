const express = require('express');
const { getAll, getById, insert, update, deleteById } = require('../services/ServiceDeptPerson.services');

const router = express.Router();

router.get("/", async (req, res) => {
    const data = await getAll();
    res.send(data);
});

router.get("/:id", async (req, res) => {
    const data = await getById(req.params.id);
    res.send(data);
});

router.post("/", async (req, res) => {
    const data = await insert(req.body);
    res.send(data);
});

router.put("/:id", async (req, res) => {
    const data = await update(req.params.id, req.body);
    res.send(data);
});

router.delete("/:id", async (req, res) => {
    const data = await deleteById(req.params.id);
    res.send(data);
});

module.exports = router;
