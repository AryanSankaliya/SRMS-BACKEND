const express = require("express");
const { getAllStatus } = require("../services/ServiceRequestStatus.services");

const routerServiceRequestStatus = express.Router();

routerServiceRequestStatus.get("/", async (req, res) => {
  const data = await getAllStatus();
  res.send(data);
});

module.exports = routerServiceRequestStatus