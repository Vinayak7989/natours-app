const fs = require("fs");
const mongoose = require("mongoose");
const Tour = require("../../models/TourModel");
const Review = require("../../models/reviewModel");
const User = require("../../models/userModel");

mongoose.connect(
  "mongodb+srv://shubhi:shubhi123@cluster0.vfpb8uc.mongodb.net/Natours?retryWrites=true&w=majority",
  () => {
    console.log("Connected to database");
  }
);

// read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);

// import data
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log("data successfully imported");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// delete all data
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") importData();
else if (process.argv[2] === "--delete") deleteData();

console.log(process.argv);
