let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");

let app = express();
app.use(cors());

app.get('/products', async (req, res) => {
  let storeData = await Product.find();
  res.json(storeData);
});

let Port = 4567;
app.listen(4567, () => {
  console.log(`Server is running on Port ${Port}`);
});


let productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name is required"],
    minlength: 3,
    maxlength: 100
  },
  description: String,
  price: {
    type: Number,
    required: [true, "Product Price is required"],
    min: 10,
    max: 1500
  },
  category: {
    type: String,
    required: [true, "Product Category is required"],
    enum: ["Electronics", "Clothing"]
  },
  quantity: {
    type: Number,
    required: [true, "Product Quantity is required"],
    min: 0
  }
});

let Product = new mongoose.model("Product", productSchema);


let savProductsToDB = async function() {
  try {
    let laptop = new Product({
      name: "Gaming Laptop",
      description: "Powerful laptop for gaming and demanding tasks.",
      price: 1299.99,
      category: "Electronics",
      quantity: 5
    });

    let tshirt = new Product({
      name: "Cool T-Shirt",
      description: "Comfortable and stylish T-shirt.",
      price: 19.99,
      category: "Clothing",
      quantity: 20
    });

    let watch = new Product({
      name: "Smartwatch",
      description: "Multifunctional smartwatch with fitness tracking and notifications.",
      price: 249.99,
      category: "Electronics",
      quantity: 12
    });

    let mobile = new Product({
      name: "High-End Smartphone",
      description: "Powerful smartphone with advanced camera and display.",
      price: 799.99,
      category: "Electronics",
      quantity: 3
    });

    // New products
    let headphones = new Product({
      name: "Wireless Headphones",
      description: "High-quality headphones with Bluetooth connectivity.",
      price: 99.99,
      category: "Electronics",
      quantity: 10
    });

    let watchBand = new Product({
      name: "Smart Watch Band",
      description: "Stylish and comfortable watch band for your smartwatch.",
      price: 29.99,
      category: "Electronics",
      quantity: 50
    });

    await Product.insertMany([laptop, tshirt, watch, mobile, headphones, watchBand])
      .then(() => console.log("Successfully saved products into DB"))
      .catch(error => {
        console.log(error);
        console.log("Unable to store data into DB");
      });

  } catch (error) {
    console.log(error);
    console.log("Unable to store data into DB");
  }
};

let getDataFromDB = async()=>{
  let storeDataFromDB = await Product.find();
  console.log(storeDataFromDB);
}

let connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://DBUser:DBUser@taskcluster.botpc04.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=taskCluster"
    );
    console.log("Successfully connected to MongoDB");
    // Uncomment to save products on startup
    savProductsToDB();
    getDataFromDB();
  } catch (error) {
    console.log("Unable to connect to MongoDB");
  }
};

connectToMongoDB();
