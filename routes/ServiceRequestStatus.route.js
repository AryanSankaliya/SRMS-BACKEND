const express = require("express");
const { getAllStatus, getStatusByID, insertStatus, upadteStatus } = require("../services/ServiceRequestStatus.services");

const routerServiceRequestStatus = express.Router();

// Get All Status
routerServiceRequestStatus.get("/", async (req, res) => {
  const data = await getAllStatus();
  res.send(data);
});

// Get Status by id
routerServiceRequestStatus.get("/:id" , async (req, res)=>{
  const data = await getStatusByID(req.params.id)
  res.send(data)
})

// insert status
routerServiceRequestStatus.post("/" , async (req, res)=>{
  const data = await insertStatus(req.body)
  res.send(data)
})

// update Status
routerServiceRequestStatus.put("/:id" , async (req, res)=>{
  const data = await upadteStatus(req.params.id , req.body)
  res.send(data)
})

// delete Status
routerServiceRequestStatus.delete("/:id" , async (req, res)=>{
  const data = await upadteStatus(req.params.id , req.body)
  res.send(data)
})
module.exports = routerServiceRequestStatus