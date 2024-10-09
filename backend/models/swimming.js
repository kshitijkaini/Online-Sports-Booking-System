const mongoose = require("mongoose");

const swimmingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    Capacity: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageurls: [],
    currentswimmingbookings: [],
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const swimmingModel = mongoose.model("swimmings", swimmingSchema);
module.exports = swimmingModel;
