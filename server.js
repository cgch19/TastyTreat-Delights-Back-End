require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const treatsRouter = require('./controllers/index');

const app = express();
const { PORT, MONGODB_URI } = process.env;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Use the routes
app.use('/api', treatsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
