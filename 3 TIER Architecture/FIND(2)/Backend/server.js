//step 1 - imports all 
let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");

let app = express();
app.use(cors());

//sep 2 - connect to db
let connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://DBUser:DBUser@taskcluster.botpc04.mongodb.net/reliance?retryWrites=true&w=majority&appName=taskCluster"
    );

    console.log("Succefully connected to the MDB");
  } catch (error) {
    console.log("Unable to connect the MDB");
  }
};
// step 3 call the function
connectToMongoDB();

// step 4 - port
app.listen(4567, () => {
  console.log("Listening the port number is 4567");
});


//step 5 - schema
let employeeschema = new mongoose.Schema({
  id: Number,
  firstName: String,
  email: String,
  gender: String,
  age: Number,
  department: String,
  country: String,
  profilepic: String,
  salary: Number,
});

//step 6 - class- model
let Employee = new mongoose.model("employee", employeeschema);

//step 7 -get the data
app.get("/employees", async (req, res) => {
  let employees = await Employee.find()
  .and([{ country: 'Russia' }, { gender: 'Male' }])
  // .or([{ country: 'Indonesia' } , { gender: 'Female' }]) // Using or condition
  .select(['id', 'profilepic', 'firstName', 'email', 'gender', 'age', 'department', 'country', 'salary']) // Selecting specific fields
  .sort({ age: 1, salary: -1}) // Sorting by age ascending and salary descending
  .limit(100) // Limiting results upto 100
  .skip(10); // Skipping the first 10 results
  // .distinct("department") // result in console
  // .count() // result in console
  console.log("Employees fetched:"); 
  res.json(employees);
});




