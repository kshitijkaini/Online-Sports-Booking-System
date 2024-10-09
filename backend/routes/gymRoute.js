const express = require("express");
const router = express.Router();

const Gym = require("../models/gym");

router.get("/getallgyms", async (req, res) => {
  try {
    const gyms = await Gym.find({});
    res.send({ gyms });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getgymbyid", async (req, res) => {
  const gymid = req.body.gymid;

  try {
    const gym = await Gym.findOne({ _id: gymid });
    res.send(gym);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
module.exports = router;
