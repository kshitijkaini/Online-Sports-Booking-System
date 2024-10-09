const express = require("express");
const router = express.Router();

const Swimming = require("../models/swimming");

router.get("/getallswimmings", async (req, res) => {
  try {
    const swimmings = await Swimming.find({});
    res.send({ swimmings });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getswimmingbyid", async (req, res) => {
  const swimmingid = req.body.swimmingid;

  try {
    const swimming = await Swimming.findOne({ _id: swimmingid });
    res.send(swimming);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
