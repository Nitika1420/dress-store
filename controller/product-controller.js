const Product = require("../models/product");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      category,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: "Error creating a product" });
  }
};

// Get  all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving products" });
  }
};

// Get product by id
exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    res.status(500).json({ error: "Error retrieving the product" });
  }
};

// Get products by name
exports.getProductsByName = async (req, res) => {
  const keyword = req.query.name;
  try {
    const products = await Product.find({
      name: { $regex: keyword, $options: "i" },
    });

    if (products.length === 0) {
      res.status(404).json({ error: "No products found with that name" });
    } else {
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(500).json({ error: "Error retrieving products by name" });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json(updatedProduct);
    }
  } catch (err) {
    res.status(500).json({ error: "Error updating the product" });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndRemove(productId);
    if (!deletedProduct) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ error: "Error deleting the product" });
  }
};

// Delete all products
exports.deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error deleting all products" });
  }
};
