require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connect");
  })
  .catch((err) => {
    console.log("error to connect DB");
  });
