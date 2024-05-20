const db = require ('../models/Treats')
const Treat = require('../models/YourTreats')


// Function to get your treats
const getYourtreats = async (req, res) => {
  try {
    console.log('getYourtreats called');

    const foundTreats = await Treat.find({});
    console.log('Found treats:', foundTreats);

    if (!foundTreats || foundTreats.length === 0) {
      console.log('No treats found');
      res.status(404).json({ message: 'Cannot find treats' });
    } else {
      res.status(200).json({ data: foundTreats });
    }
  } catch (err) {
    console.error('Error finding treats:', err.message);
    res.status(400).json({ error: err.message });
  }
};
// Function to create your treats
const createYourtreats = async (req, res) => {
  try {
    console.log('createYourtreats called');
    console.log('Request body:', req.body);

    const createdYourTreats = new Treat(req.body);
    await createdYourTreats.save();
    console.log('Saved created treats:', createdYourTreats);

    res.status(201).json({ data: createdYourTreats, message: 'Your treats created' });
  } catch (err) {
    console.error('Error creating treats:', err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getYourtreats,
  createYourtreats,
};
