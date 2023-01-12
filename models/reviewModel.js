const mongoose = require("mongoose");
const Tour = require("./tourModel");

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "Review must belong to a tour"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  }
};

reviewSchema.post("save", function () {
  // this points to currrent review
  this.constructor.calcAverageRatings(this.tour);
});

// reviewSchema.pre(/^findOneAnd/, async function (next) {
//   // this is currenty query and not document
//   this.r = await this.findOne();
//   console.log(this.r);
//   next();
// });

reviewSchema.post(/^findOneAnd/, async function () {
  // await this.findOne();  doesn't work
  this.r.constructor.calcAverageRatings(this.r.tour);
  console.log(this.r);
});
module.exports = mongoose.model("Review", reviewSchema);
