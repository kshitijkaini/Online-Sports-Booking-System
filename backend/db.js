const mongoose = require("mongoose");

var mongoURL =
  "mongodb+srv://kshitijkaini:ciL8Nk1xJlwBgbJN@cluster0.etcpc9e.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB connection failed");
});
connection.on("connected", () => {
  console.log("Mongo DB connection succesful");
});

module.exports = mongoose;


