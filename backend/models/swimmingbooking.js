const mongoose = require("mongoose");

const swimmingbookingSchema = mongoose.Schema(
  {
    swimming: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    swimmingid: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },

    price: {
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

const swimmingbookingmodel = mongoose.model(
  "swimmingbookings",
  swimmingbookingSchema
);
module.exports = swimmingbookingmodel;
