const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

const productRoutes = require("./routes/product-routes");

// Set up MongoDB connection
const dbURI =
  "mongodb+srv://mongouser:dbPass123@cluster0.iwvxk9s.mongodb.net/Marketplace?retryWrites=true&w=majority";

const connectDb = async () => {
  await mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

app.use(cors());
app.use(express.json());

// add product routes
app.use("/api/products", productRoutes);

// 404
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// error route
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// connect db and start app
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
