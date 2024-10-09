const express = require("express");
const router = express.Router();
const User = require("../models/user");
const axios = require('axios');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const keysecret = "asdfghjklzxcvbnmqwertyuiopasdfgh"
// email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kshitijkaini@gmail.com",
    pass: "crjputivyihvnwup"
  }
})
  
 
 






router.post("/register", async (req, res) => {
  const newuser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const user = await newuser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      const temp = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
      };
      res.send(temp);
    } else {
      return res.status(400).json({ message: "Login failed" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
});




// send email Link For reset Password 
router.post("/sendpasswordlink", async (req, res) => {
  try { console.log(req.body) }
  catch (err) { console.log(err) }

  const { email } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter Your Email" })
  }

  try {
    const user = await User.findOne({ email: email });

    // const userfind = await userdb.findOne({ email: email });



    // token generate for reset password
    const token = jwt.sign({ _id: user._id }, keysecret, {
      expiresIn: "360000s"
    });

    const setusertoken = await User.findByIdAndUpdate({ _id: user._id }, { verifytoken: token }, { new: true });
    console.log("setusertoken", setusertoken)
    console.log(email)
    if (setusertoken) {
      const mailOptions = {
        from: "kshitijkaini@gmail.com",
        to: email,
        subject: "Sending Email For password Reset",
        text: `This Link Valid For 2 MINUTES   http://localhost:3000/forgetpassword/${user.id}`
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, message: "email not send" })
        } else {
          console.log("Email sent", info.response);
          res.status(201).json({ status: 201, message: "Email sent Succsfully" })
        }
      })

    }

  } catch (error) {
    res.status(401).json({ status: 401, message: "invalid user" })
  }

});




// verify user for forgot password time, real game start here
router.get("/forgotpassword/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });

    //const verifyToken = jwt.verify(token,keysecret);

    //console.log(verifyToken)

    if (user) {
      res.status(201).json({ status: 201, user })
    } else {
      res.status(401).json({ status: 401, message: "user not exist" })
    }

  } catch (error) {
    res.status(401).json({ status: 401, error })
  }
});






// change password        

router.post("/forgotpassword/change/:id", async (req, res) => {
  const { id } = req.params;

  const { password } = req.body;

  try {
    //const validuser = await userdb.findOne({_id:id});
    const user = await User.findOne({ _id: id });

    //const verifyToken = jwt.verify(token,keysecret);

    if (user) {
      //const newpassword = await bcrypt.hash(password,12);

      const setnewuserpass = await User.findByIdAndUpdate({ _id: id }, { password: password });

      setnewuserpass.save();
      res.status(201).json({ status: 201, setnewuserpass })

    } else {
      res.status(401).json({ status: 401, message: "user not exist" })
    }
  } catch (error) {
    res.status(401).json({ status: 401, error })
  }
})










module.exports = router;
