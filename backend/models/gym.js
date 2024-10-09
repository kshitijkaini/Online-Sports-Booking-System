const mongoose = require("mongoose");

const gymSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    pricepermonth: {
      type: Number,
      required: true,
    },
    imageurls: [],
    currentgymbookings: [],
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const gymModel = mongoose.model("gyms", gymSchema);
module.exports = gymModel;
