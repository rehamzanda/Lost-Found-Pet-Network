// define mongoose
const mongoose = require("mongoose");

// connect to database
mongoose
  .connect(process.env.CONNECTION_DB)
  .then(() => console.log("connected sccesfully"))
  .catch((err) => console.log(err));