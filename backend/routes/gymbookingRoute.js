const express = require("express");
const router = express.Router();
const GymBooking = require("../models/gymbooking");
const Gym = require("../models/gym");
const moment = require("moment");

router.post("/bookgym", async (req, res) => {
  const { gym, userid, user, package, pricepermonth, totalamount } = req.body;

  try {
    const newgymbooking = new GymBooking({
      gym: gym.name,
      gymid: gym._id,
      user,
      userid,
      package,
      pricepermonth,
      totalamount,
      transactionId: "1234",
    });

    const gymbooking = await newgymbooking.save();

    const gymtemp = await Gym.findOne({ _id: gym._id });

    if (!gymtemp.currentgymbookings) {
      gymtemp.currentgymbookings = [];
    }

    gymtemp.currentgymbookings.push({
      gymbookingid: gymbooking._id,
      package,
      userid: userid,
      status: gymbooking.status,
    });

    await gymtemp.save();
    res.send("Gym Booked Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
