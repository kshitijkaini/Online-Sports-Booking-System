const mongoose = require("mongoose");

const gymbookingSchema = mongoose.Schema(
  {
    gym: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    gymid: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
    package: {
      type: String,
      required: true,
    },
    pricepermonth: {
      type: Number,
      required: true,
    },
    totalamount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "booked",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const gymbookingmodel = mongoose.model("gymbookings", gymbookingSchema);
module.exports = gymbookingmodel;
