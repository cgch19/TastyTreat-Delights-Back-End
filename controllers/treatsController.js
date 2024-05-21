const db = require('../models/Treats');

// Function to get your treats
const getYourtreats = async (req, res) => {
  try {
    console.log('getYourtreats called');
    console.log('Request user ID:', req.user ? req.user.id : 'No user ID');

    const foundTreats = await db.Treat.find({});
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
    console.log('Request user ID:', req.user ? req.user.id : 'No user ID');

    const createdYourTreats = await db.Treat.create(req.body);
    await createdYourTreats.save();
    console.log('Saved created treats:', createdYourTreats);

    if (!createdYourTreats) {
      console.log('Failed to create treats');
      res.status(400).json({ message: 'Cannot create your treats' });
    } else {
      res.status(201).json({ data: createdYourTreats, message: 'Your treats created' });
    }
  } catch (err) {
    console.error('Error creating treats:', err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getYourtreats,
  createYourtreats,
};
