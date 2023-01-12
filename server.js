const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

const app = require("./app");

mongoose.connect(process.env.DATABASE, () => {
  console.log("Connected to database");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
