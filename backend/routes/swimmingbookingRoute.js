const express = require("express");
const router = express.Router();
const SwimmingBooking = require("../models/swimmingbooking");
const Swimming = require("../models/swimming");
const moment = require("moment");

router.post("/bookswimming", async (req, res) => {
  const { swimming, userid, user, price, totalamount } = req.body;

  try {
    const newswimmingbooking = new SwimmingBooking({
      swimming: swimming.name,
      swimmingid: swimming._id,
      user,
      userid,
      price,

      totalamount,
      transactionId: "1234",
    });

    const swimmingbooking = await newswimmingbooking.save();

    const swimmingtemp = await Swimming.findOne({ _id: swimming._id });

    if (!swimmingtemp.currentswimmingbookings) {
      swimmingtemp.currentswimmingbookings = [];
    }

    swimmingtemp.currentswimmingbookings.push({
      swimmingbookingid: swimmingbooking._id,
      price,
                                     
      userid: userid,
      status: swimmingbooking.status,
    });

    await swimmingtemp.save();
    res.send("Pool Booked Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
