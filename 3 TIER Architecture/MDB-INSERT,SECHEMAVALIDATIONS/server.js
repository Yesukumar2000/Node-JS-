let mongoose = require("mongoose");

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

let savProductsToDB = function() {
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

    Product.insertMany([laptop, tshirt, watch, mobile])
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

let connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://DBUser:DBUser@taskcluster.botpc04.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=taskCluster"
    );
    console.log("Successfully connected to MongoDB");
    savProductsToDB();
  } catch (error) {
    console.log("Unable to connect to MongoDB");
  }
};

connectToMongoDB();
