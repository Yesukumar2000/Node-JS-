// Step 1: Import libraries
let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");

// Step 2: Initialize Express app
let app = express();

// Step 3: Configure middleware
app.use(cors());
app.use(express.json()); // This allows parsing incoming JSON data

// Step 4: Connect to MongoDB
let connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/employeesDB");
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("Unable to connect to MongoDB", error);
  }
};

// Step 5: Define User schema
let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNo: Number,
  profilePic: String,
});

// Step 6: Create User model
let User = mongoose.model("user", userSchema);

// Step 7:  POST API for user registration
app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      mobileNo: req.body.mobile, 
      profilePic: req.body.profilePic,
    });

    await newUser.save(); // Save the user

    console.log("User saved successfully");
    res.json({ status: "Success", msg: "User created successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.json({ status: "Failure", msg: "Unable to create User", error: error.message });
  }
});


// Step 8: call the function
connectToMongoDB();
// step 9 - port
app.listen(7999, () => {
  console.log("Listening the port number is 7999");
});