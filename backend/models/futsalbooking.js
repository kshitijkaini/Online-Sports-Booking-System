const mongoose = require("mongoose");

const futsalbookingSchema = mongoose.Schema(
  {
    futsal: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    futsalid: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },

    Date: {
      type: String,
      required: true, 
    },
    priceperhour: {
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
    TimeSlot: [],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const futsalbookingmodel = mongoose.model(
  "futsalbookings",
  futsalbookingSchema
);
module.exports = futsalbookingmodel;
