require("dotenv").config();
const express = require("express");
const connectDB = require("./db/mongo");
const routerServiceRequestStatus = require("./routes/ServiceRequestStatus.route");

const app = express();
app.use(express.json());

connectDB();

app.use("/status", routerServiceRequestStatus);


app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
