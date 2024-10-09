const express = require("express");
const router = express.Router();
const multer = require('multer');
const moment = require("moment");
const axios = require('axios');
const mongoose = require('mongoose');


const keysecret = "asdfghjklzxcvbnmqwertyuiopasdfgh"






const Futsal = require("../models/futsal");
//multer
// img storage path 
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images")
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}.xxx.${file.originalname}`)
    //callback(null,`imges-${Date.now()}. ${file.originalname}`)
  }
})


// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true)
  } else {
    callback(new Error("only images is allowed"))
  }
}

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage
});







router.get("/getallfutsals", async (req, res) => {
  try {
    const futsals = await Futsal.find({ facilityType: "futsal" });
    res.send({ futsals });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});


router.get("/getallgyms", async (req, res) => {
  try {
    const futsals = await Futsal.find({ facilityType: "gym" });
    res.send({ futsals });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});


router.get("/getallswimming", async (req, res) => {
  try {
    const futsals = await Futsal.find({ facilityType: "swimming-pool" });
    res.send({ futsals });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/getallbadminton", async (req, res) => {
  try {
    const futsals = await Futsal.find({ facilityType: "Bad-minton" });
    res.send({ futsals });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});


router.post("/getfutsalbyid", async (req, res) => {
  const futsalid = req.body.futsalid;

  try {
    const futsal = await Futsal.findOne({ _id: futsalid });
    res.send(futsal);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

//registration of sport center                
router.post("/saveSportCentre", upload.array("imageurls", 3), async (req, res) => {

  const imageurls = req.files.map((file) => {
    return file.filename;
  })

  console.log("imageurls", imageurls)
  console.log("user", req.body)

  const {
    facilityType,
    name,
    priceperhour,
    location,
    phone,
    gamemode,
    currentBookings,
    description,
    email,
    password,
    cpassword,
    longitude,
    latitude
  } = req.body;

  try {
    const finalUser = new Futsal({
      facilityType,
      name,
      imageurls,
      priceperhour,
      location,
      phone,
      gamemode,
      currentBookings,
      description,
      email,
      password,
      cpassword,
      longitude,
      latitude
    });

    const storeData = await finalUser.save();

    res.send("User Registered Successfully");
    console.log("fick", storeData)
  }
  catch (error) {
    res.status(403).json({ error });
  }

});



router.post("/loginbusiness", async (req, res) => {
  const { facilityType, email, password } = req.body;

  try {
    const user = await Futsal.findOne({ facilityType: facilityType, email: email, password: password });
    if (user) {
      const temp = {
        facilityType: facilityType,
        name: user.name,
        email: user.email,
        _id: user._id,
      };
      res.send(user);
    } else {
      return res.status(400).json({ message: "Login failed" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});


router.post('/khalti', async (req, res) => {
  const data = req.body;
  console.log("datas", data)
  const config = {
    headers: {
      Authorization: 'Key test_secret_key_d19cbd764c604057a186bdab037409e2'
    }
  };
  try {
    const response = await axios.post(
      'https://khalti.com/api/v2/payment/verify/',
      data,
      config
    );
    res.send(response.data);
    console.log(response.data)
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.post("/selectedData/:id/:_id", async (req, res) => {
  try {
    // Extract the 'id' and '_id' parameters from the request
    const { id } = req.params;
    const { _id } = req.params;
    // const {selectedDatas} = req.body.selectedDatas;
    // const {bookedUsers} = req.body.bookedUsers;
    const { selectedDatas, bookedUsers } = req.body;
    // Log the extracted parameters and the request body to your console
    console.log("id:fuck", id);
    console.log("_id:suck", _id);
    console.log("detail of bookedUsers", bookedUsers);
    try {
      console.log("request body:", selectedDatas);
    }
    catch (error) {
      console.log(error)
    }
    // Check if the user with the given _id exists in your database
    const validuser = await Futsal.findOne({ _id: id }).maxTimeMS(20000);
    // Create a new booked user object with the required fields
    const newBookedUser = {
      name: bookedUsers[0].name,
      email: bookedUsers[0].email,
      // isAdmin: bookedUsers.isAdmin,
      userId: bookedUsers[0]._id,

      currentfutsalbookings: selectedDatas
    };

    // Add the booked user to the bookedUsers array
    validuser.bookedUsers.push(newBookedUser);

    // Add the selected data to the currentfutsalbookings array 
    validuser.currentfutsalbookings.push(...req.body.selectedDatas);

    // Save the updated Futsal document to the database
    await validuser.save();

    // Send a response back to the client with a success status code
    res.status(200).json({ status: 200, message: "Selected data added to Futsal document" });


  } catch (error) {
    // If there was an error, log it to your console and send an error response back to the client
    console.log(error);
    res.status(500).json({ status: 500, error: error.message });
  }
});



router.get("/getdetails/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id:", id);

  // Find the Futsal document with the given _id
  const futsal = await Futsal.findOne({ _id: id });

  const bookings = futsal.currentfutsalbookings;
  res.send(bookings);


}
);


router.get('/mapdata', async (req, res) => {
  try {
    const futsals = await Futsal.find({});
    const data = futsals.map((futsal) => {
      return {
        id: futsal._id,
        geocode: [futsal.longitude, futsal.latitude],
        popUP: futsal.name,
        url: `http://localhost:3000/Futsal/${futsal._id}`,
        facility: futsal.facilityType
      };
    });
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


router.get('/dashboard/:ids', async (req, res) => {
  const { ids } = req.params;
  console.log("ids:", ids);
  try {
    // Retrieve the data from MongoDB using the model
    const futsals = await Futsal.findOne({ _id: ids }).maxTimeMS(20000);;

    // Send the data as a JSON response
    res.json(futsals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



router.post("/addData/:ids", async (req, res) => {
  try {
    const { ids } = req.params;
    console.log("ids:", ids);
    const { name, email, userId, date, time } = req.body;
    console.log("ids:", ids);
    // Find the relevant document by its _id
    const futsal = await Futsal.findById(ids);

    if (!futsal) {
      return res.status(404).json({ error: 'Futsal not found' });
    }

    // Add the new booking to the bookedUsers array
    futsal.bookedUsers.push({
      name,
      email,
      userId,
      currentfutsalbookings: [
        {
          date,
          time
        }
      ]
    });

    // Save the updated document
    await futsal.save();

    futsal.currentfutsalbookings.push({
      date,
      time
    });

    await futsal.save();

    res.status(200).json({ message: 'Booking added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});







// DELETE route to remove a row from MongoDB based on name and email
router.delete('/delete/parti/:futsalId/:name/:email', async (req, res) => {
  const { futsalId, name, email } = req.params;
 
  try {
    // Find the Futsal document by futsalId
    const futsal = await Futsal.findById(futsalId);

    // Filter out the row from bookedUsers array based on name and email
    futsal.bookedUsers = futsal.bookedUsers.filter(user => user.name !== name || user.email !== email);

    // Save the updated Futsal document
    await futsal.save();



    
    res.status(200).json({ message: 'Row deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the row.' });
  }
});




router.delete('/delete/:futsalId/:name/:email', async (req, res) => {
  const { futsalId, name, email } = req.params;

  try {
    // // Find the Futsal document by futsalId
    // const futsal = await Futsal.findById(futsalId);

    
    // // Filter out the row from bookedUsers array based on name and email
    // futsal.bookedUsers = futsal.bookedUsers.filter(user => user.name !== name || user.email !== email);

    // // Save the updated Futsal document
    // await futsal.save();

 // Find the Futsal document by futsalId
 const futsals = await Futsal.findById(futsalId);

    // Get the bookedUser object that matches the name and email
    const bookedUser = futsals.bookedUsers.find(user => user.name === name && user.email === email);

    if (bookedUser) {
      // Get the date and time values from the bookedUser object
      const bookingsToRemove = bookedUser.currentfutsalbookings;

      // Remove all matching entries from the currentfutsalbookings array of the futsal document
      futsals.currentfutsalbookings = futsals.currentfutsalbookings.filter(booking => {
        for (const bookingToRemove of bookingsToRemove) {
          if (booking.date === bookingToRemove.date && booking.time === bookingToRemove.time) {
            return false;
          }
        }
        return true;
      });

      // Save the updated Futsal document
      await futsals.save();

      res.status(200).json({ message: 'Row deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Row not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the row.' });
  }
});
       



module.exports = router;

  // const markers = [
  //   {
  //     id: 1,
  //     geocode: [27.652985, 85.320263],
  //     popUP: "Nabin futsal",
  //     url:"http://localhost:3000/Futsal"
  //   },
  //   {
  //     id: 1,
  //     geocode: [27.655944, 85.318611],
  //     popUP: "lalitpur futsal",
  //     url:"http://localhost:3000/Futsal"
  //   },
  //   {
  //     id: 3,
  //     geocode: [27.656055, 85.325793],
  //     popUP: "keshab futsal",
  //     url:"http://localhost:3000/Futsal"
  //   },
  //   {
  //     id: 3,
  //     geocode: [27.656029, 85.326899],
  //     popUP: "thamel futsal",
  //     url:"http://localhost:3000/Futsal"
  //   },
  //   {
  //     id: id,
  //     geocode: [latitude, longitude],
  //     popUP: name,
  //     url:`http://localhost:3000/Futsal/${id}`
  //   }
  // ]