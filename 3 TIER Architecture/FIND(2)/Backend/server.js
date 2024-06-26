//step 1 - imports 
let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
let morgan = require("morgan");
let fs = require('fs')
var path = require('node:path')
let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// app.use(morgan('combined'));
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('tiny', { stream: accessLogStream }))

let mwf1 =(req,res,next)=>{
  console.log('mwf1');
  next();
}
let mwf2 =(req,res,next)=>{
  console.log('mwf2');
  next();
}
 
app.use(mwf1);
app.use(mwf2);
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

//step 7 -get the data  - params
app.get("/employees/:countryName/:departmentName/:genderName", async (req, res) => {
  console.log(req.params);
  
  let employees = await Employee.find().and([{country:req.params.countryName},{department:req.params.departmentName},{gender:req.params.genderName}]).sort(req.query.order == "asc"?"age":"-age");

  console.log("Employees fetched:",employees); 
  res.json(employees);

});


app.get("/employees",async (req, res) => {
  let employees = await Employee.find()
  console.log("Employees fetched:"); 
  res.json(employees);
});
app.get('/countriesList',async(req,res)=>{
 let CountriesList = await Employee.find().distinct('country');
   res.json(CountriesList);
})
app.get('/gendersList',async(req,res)=>{
  let GendersList = await Employee.find().distinct('gender');
    res.json(GendersList);
 })
 app.get('/departmentsList',async(req,res)=>{
  let DepartmentsList = await Employee.find().distinct('department');
    res.json(DepartmentsList);
 })



