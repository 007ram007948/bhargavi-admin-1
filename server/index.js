// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Define a schema and model for the contact form submissions
const contactSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// Define a schema and model for the user
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  phoneNumber: String,
  gender: String,
  message: String,
});

const User = mongoose.model("User", userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to handle user registration
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, age, phoneNumber, gender, message } = req.body;

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      age,
      phoneNumber,
      gender,
      message,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to handle contact form submissions
app.post("/api/contact", async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;

    // Create a new contact instance
    const newContact = new Contact({
      fullName,
      email,
      phone,
      message,
    });

    // Save the contact form submission to the database
    await newContact.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to get registered users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to get contact form submissions
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
});
