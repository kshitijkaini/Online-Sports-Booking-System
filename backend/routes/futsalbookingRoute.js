const express = require("express");
const router = express.Router();
const FutsalBooking = require("../models/futsalbooking");
const Futsal = require("../models/futsal");
const moment = require("moment");

router.post("/bookfutsal", async (req, res) => {
  const {
    futsal,
    userid,
    user,
    selectedDate,
    priceperhour,
    totalamount,
    selectedSlots,
  } = req.body;

  try {
    const newfutsalbooking = new FutsalBooking({
      futsal: futsal.name,
      futsalid: futsal._id,
      user,
      userid,
      Date: moment(selectedDate).format("DD-MM-YYYY"),
      priceperhour,
      totalamount,
      TimeSlot: selectedSlots,

      transactionId: "1234",
    });

    const futsalbooking = await newfutsalbooking.save();

    const futsaltemp = await Futsal.findOne({ _id: futsal._id });

    if (!futsaltemp.currentfutsalbookings) {
      futsaltemp.currentfutsalbookings = [];
    }

    futsaltemp.currentfutsalbookings.push({
      futsalbookingid: futsalbooking._id,
      Date: moment(selectedDate).format("DD-MM-YYYY"),
      userid: userid,
      status: futsalbooking.status,
    });

    await futsaltemp.save();
    res.send("Futsal Booked Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/getfutsalbookingsbyuserid", async (req, res) => {
  const userid = req.body.userid;
  try {
    const futsalbooking = await FutsalBooking.find({ userid: userid });
    res.send(futsalbooking);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
