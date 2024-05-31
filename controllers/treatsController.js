const db = require('../models/Treats');
const Catalog = require('../models/catalog');

// Get all treats
const getYourtreats = async (req, res) => {
  try {
    console.log('getYourtreats called by user:', req.user.id);

    const foundTreats = await db.Treat.find();
    console.log('Found treats:', foundTreats);

    if (!foundTreats || foundTreats.length === 0) {
      console.log('No treats found');
      return res.status(404).json({ message: 'Cannot find treats' });
    }

    res.status(200).json({ data: foundTreats });
  } catch (err) {
    console.error('Error finding treats:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new treat
const createYourtreats = async (req, res) => {
  try {
    console.log('createYourtreats called by user:', req.user.id);
    console.log('Request body:', req.body);
    const treatData = {
      ...req.body,
      User: req.user.id,
    };
    const createdYourTreats = await db.Treat.create(treatData);
    console.log('Saved created treats:', createdYourTreats);

    res.status(201).json({ data: createdYourTreats, message: 'Your treats created' });
  } catch (err) {
    console.error('Error creating treats:', err.message);
    res.status(500).json({ error: 'Server error' });
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
      return res.status(404).json({ message: 'Treat not found' });
    }

    res.status(200).json({ data: updatedTreat, message: 'Treat updated successfully' });
  } catch (err) {
    console.error('Error updating treat:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete Treats Route
const deleteYourtreats = async (req, res) => {
  try {
    console.log('deleteYourtreats called by user:', req.user.id);
    const { id } = req.params;
    console.log('Treat ID to delete:', id);

    const deletedTreat = await db.Treat.findByIdAndDelete(id);
    console.log('Deleted treat:', deletedTreat);

    if (!deletedTreat) {
      console.log('Treat not found');
      return res.status(404).json({ message: 'Treat not found' });
    }

    res.status(200).json({ data: deletedTreat, message: 'Treat deleted successfully' });
  } catch (err) {
    console.error('Error deleting treat:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Sell a treat
const sellYourtreats = async (req, res) => {
  try {
    console.log('sellYourtreats called by user:', req.user.id);
    console.log('Request body:', req.body);

    const treatToSell = req.body;
    delete treatToSell._id;

    const createdCatalogEntry = await Catalog.create(treatToSell);
    console.log('Saved sold treat:', createdCatalogEntry);

    const deletedTreat = await db.Treat.findByIdAndDelete(req.body._id);
    console.log('Deleted treat from Treats:', deletedTreat);

    res.status(201).json({ data: createdCatalogEntry, message: 'Your treat has been sold and added to the catalog' });
  } catch (err) {
    console.error('Error selling treat:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get catalog items
const getCatalog = async (req, res) => {
  try {
 //   console.log('getCatalog called by user:', req.user.id);
    const catalogItems = await Catalog.find({});
    console.log('Found catalog items:', catalogItems);

    if (!catalogItems || catalogItems.length === 0) {
      console.log('No catalog items found');
      return res.status(404).json({ message: 'No catalog items found' });
    }

    res.status(200).json({ data: catalogItems });
  } catch (err) {
    console.error('Error finding catalog items:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE CATALOG 
const deleteCatalogItem = async (req, res) => {
  try {
    console.log('deleteCatalogItem called by user:', req.user.id);
    const { id } = req.params;
    console.log('Catalog item ID to delete:', id);

    const deletedCatalogItem = await Catalog.findByIdAndDelete(id);
    console.log('Deleted catalog item:', deletedCatalogItem);

    if (!deletedCatalogItem) {
      console.log('Catalog item not found');
      return res.status(404).json({ message: 'Catalog item not found' });
    }

    res.status(200).json({ data: deletedCatalogItem, message: 'Catalog item deleted successfully' });
  } catch (err) {
    console.error('Error deleting catalog item:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getYourtreats,
  createYourtreats,
  updateYourtreats,
  deleteYourtreats,
  sellYourtreats,
  getCatalog,
  deleteCatalogItem 
};
