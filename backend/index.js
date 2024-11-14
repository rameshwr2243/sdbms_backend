const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');

// Initialize dotenv to load environment variables
dotenv.config();

// Check if the .env file is being loaded
if (!process.env.MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined. Please ensure it's set in the .env file.");
  process.exit(1);  // Stop the server if MONGODB_URI is not defined
}

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using mongoose
async function connectToMongoDB() {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MongoDB URI is missing in .env file");
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed: ', err);
    process.exit(1);  // Exit the process if connection fails
  }
}

connectToMongoDB();

// Set up routes
app.use('/api', studentRoutes);

// Set up the server to listen on specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
