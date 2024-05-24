const db = require('../models/Treats');
const Catalog = require('../models/catalog')

// Get all treats
const getYourtreats = async (req, res) => {
  try {
    console.log('getYourtreats called');

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
// Create a new treat
const createYourtreats = async (req, res) => {
  try {
    console.log('createYourtreats called');
    console.log('Request body:', req.body);

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

// Update Your Treats
const updateYourtreats = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      console.error('Error updating treat: ID is undefined');
      return res.status(400).json({ error: 'ID is undefined' });
    }
    console.log('Treat ID to update:', id);
    console.log('Request body:', req.body);

    const updatedTreat = await db.Treat.findByIdAndUpdate(id, req.body, { new: true });
    console.log('Updated treat:', updatedTreat);

    if (!updatedTreat) {
      console.log('Treat not found');
      res.status(404).json({ message: 'Treat not found' });
    } else {
      res.status(200).json({ data: updatedTreat, message: 'Treat updated successfully' });
    }
  } catch (err) {
    console.error('Error updating treat:', err.message);
    res.status(400).json({ error: err.message });
  }
};


// Delete Treats Route
const deleteYourtreats = async (req, res) => {
  try {
    console.log('deleteYourtreats called');
    const { id } = req.params;
    console.log('Treat ID to delete:', id);

    const deletedTreat = await db.Treat.findByIdAndDelete(id);
    console.log('Deleted treat:', deletedTreat);

    if (!deletedTreat) {
      console.log('Treat not found');
      res.status(404).json({ message: 'Treat not found' });
    } else {
      res.status(200).json({ data: deletedTreat, message: 'Treat deleted successfully' });
    }
  } catch (err) {
    console.error('Error deleting treat:', err.message);
    res.status(400).json({ error: err.message });
  }
};

// Sell a treat
const sellYourtreats = async (req, res) => {
  try {
    console.log('sellYourtreats called');
    console.log('Request body:', req.body);

    const treatToSell = req.body;

    delete treatToSell._id;

    const createdCatalogEntry = await Catalog.create(treatToSell); 
    console.log('Saved sold treat:', createdCatalogEntry);

    if (!createdCatalogEntry) {
      console.log('Failed to sell treat');
      return res.status(400).json({ message: 'Cannot sell your treat' });
    }

    const deletedTreat = await db.Treat.findByIdAndDelete(req.body._id);
    console.log('Deleted treat from Treats:', deletedTreat);

    res.status(201).json({ data: createdCatalogEntry, message: 'Your treat has been sold and added to the catalog' });
  } catch (err) {
    console.error('Error selling treat:', err.message);
    res.status(400).json({ error: err.message });
  }
};

// Get catalog items
const getCatalog = async (req, res) => {
  try {
    console.log('getCatalog called');
    const catalogItems = await Catalog.find({});
    console.log('Found catalog items:', catalogItems);

    if (!catalogItems || catalogItems.length === 0) {
      console.log('No catalog items found');
      res.status(404).json({ message: 'No catalog items found' });
    } else {
      res.status(200).json({ data: catalogItems });
    }
  } catch (err) {
    console.error('Error finding catalog items:', err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getYourtreats,
  createYourtreats,
  updateYourtreats,
  deleteYourtreats,
  sellYourtreats, 
  getCatalog, 
};