const express = require('express');
const { getById } = require('../services/ServiceDeptPerson.services');
const { insert, upadte, deleteById } = require('../services/ServiceDept.services');

const roterServiceDept = express.Router();

roterServiceDept.get("/", async (req, res) => {
  const data = await getAll();
  res.send(data);
});

roterServiceDept.get("/:id", async (req, res) => {
  const data = await getById();
  res.send(data);
});

roterServiceDept.post("/", async (req, res) => {
  const data = await insert();
  res.send(data);
});

roterServiceDept.put("/:id", async (req, res) => {
  const data = await upadte();
  res.send(data);
});

roterServiceDept.get("/:id", async (req, res) => {
  const data = await deleteById();
  res.send(data);
});

