require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./db/mongo");

const routerServiceRequestStatus = require("./routes/ServiceRequestStatus.route");
const routerServiceDeptPerson = require("./routes/ServiceDeptPerson.route");
const routerServiceRequest = require("./routes/ServiceRequest.route");
const routerServiceRequestReply = require("./routes/ServiceRequestReply.route");
const routerServiceRequestType = require("./routes/ServiceRequestType.route");
const routerServiceRequestTypeWisePerson = require("./routes/ServiceRequestTypeWisePerson.route");
const routerServiceType = require("./routes/ServiceType.route");
const roterServiceDept = require("./routes/ServiceDept.route");
const routerStaff = require("./routes/staff.route");
const routerStudent = require("./routes/student.route");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/status", routerServiceRequestStatus);
app.use("/deptPerson", routerServiceDeptPerson);
app.use("/request", routerServiceRequest);
app.use("/reply", routerServiceRequestReply);
app.use("/requestType", routerServiceRequestType);
app.use("/typeWisePerson", routerServiceRequestTypeWisePerson);
app.use("/type", routerServiceType);
app.use("/dept", roterServiceDept)
app.use("/staff", routerStaff);
app.use("/student", routerStudent);


app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
