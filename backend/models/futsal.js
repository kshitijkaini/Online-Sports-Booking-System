const mongoose = require("mongoose");

const futsalSchema = mongoose.Schema(
  {
    facilityType: { type: String, enum: ['futsal', 'gym', 'swimming-pool','Bad-minton'] },
    name: {
      type: String,
      required: true,
    },
    imageurls: [],

    currentfutsalbookings: [],

    description: {
      type: String,
      required: true,
    },
    priceperhour: {
      type: Number,
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
    gamemode: {
      type: String,
      required: false,
    },

    currentBooking: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 2
    },
    cpassword: {
      type: String,
      required: false,
      minlength: 2
    },
    longitude: {
      type: Number,
      required: false,
    },
    latitude: {
      type: Number,
      required: false,
    },
    bookedUsers: [ ],

  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const futsalModel = mongoose.model("futsals", futsalSchema); 
module.exports = futsalModel;
