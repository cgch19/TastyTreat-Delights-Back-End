const Treats = require('../models/YourTreats'); // Adjust the path as needed

// Get all treats
const getYourtreats = async (req, res) => {
  try {
    const treats = await Treats.find(); // Fetch all fields
    res.status(200).json({ data: treats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new treat
const createYourtreats = async (req, res) => {
  const { Product, Image, Description, Price, User } = req.body;

  const newTreat = new Treats({
    Product,
    Image,
    Description,
    Price,
    User,
  });

  try {
    const savedTreat = await newTreat.save();
    res.status(201).json(savedTreat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getYourtreats,
  createYourtreats,
};
