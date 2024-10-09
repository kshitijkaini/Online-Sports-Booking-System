const express = require("express");
const dotenv = require("dotenv");
const multer = require('multer');
const moment = require("moment")
const axios = require('axios');
const path = require('path');
 

dotenv.config(); 

const app = express();

const dbConfig = require("./db");
const futsalRoute = require("./routes/futsalRoute");
const swimmingRoute = require("./routes/swimmingRoute");
const gymRoute = require("./routes/gymRoute");
const usersRoute = require("./routes/usersRoute");
const futsalbookingRoute = require("./routes/futsalbookingRoute");
const gymbookingRoute = require("./routes/gymbookingRoute");
const swimmingbookingRoute = require("./routes/swimmingbookingRoute");


app.use(express.json());
// Serve static files from the public folder
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


app.use("/api/futsals", futsalRoute);    
app.use("/api/swimmings", swimmingRoute);
app.use("/api/gyms", gymRoute);
app.use("/api/users", usersRoute);
app.use("/api/futsalbookings", futsalbookingRoute);
app.use("/api/gymbookings", gymbookingRoute);
app.use("/api/swimmingbookings", swimmingbookingRoute);

app.use("/images",express.static("./images"));

app.get('/endpoint', (req, res) => {
    const jsonData = {
      name: 'John Doe',
      age: 30,
      email: 'johndoe@example.com'
    };    
   
    res.json(jsonData);
  });



const port = process.env.PORT || 5000; // or any other available port
app.listen(port, () => console.log(`Server started on PORT ${port}`));
