const db = require('../models');
const Catalog = require('../models/catalog');

// Get all treats for logged-in user
const getYourtreats = async (req, res) => {
  try {
    const foundTreats = await db.Treat.find({ userId: req.user.id });
    if (!foundTreats || foundTreats.length === 0) {
      return res.status(404).json({ message: 'Cannot find treats' });
    }
    res.status(200).json({ data: foundTreats });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Create a new treat
const createYourtreats = async (req, res) => {
  try {
    req.body.userId = req.user.id; // Attach user ID to the new treat
    const createdYourTreats = await db.Treat.create(req.body);
    await createdYourTreats.save();
    res.status(201).json({ data: createdYourTreats, message: 'Your treats created' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Your Treats
const updateYourtreats = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTreat = await db.Treat.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedTreat) {
      return res.status(404).json({ message: 'Treat not found' });
    }
    res.status(200).json({ data: updatedTreat, message: 'Treat updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Treats Route
const deleteYourtreats = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTreat = await db.Treat.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deletedTreat) {
      return res.status(404).json({ message: 'Treat not found' });
    }
    res.status(200).json({ data: deletedTreat, message: 'Treat deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Sell a treat
const sellYourtreats = async (req, res) => {
  try {
    const treatToSell = await db.Treat.findOne({ _id: req.body._id, userId: req.user.id });
    if (!treatToSell) {
      return res.status(404).json({ message: 'Treat not found' });
    }
    delete treatToSell._id; // Remove _id to avoid duplicate key error
    const createdCatalogEntry = await Catalog.create(treatToSell);
    await db.Treat.findByIdAndDelete(req.body._id);
    res.status(201).json({ data: createdCatalogEntry, message: 'Your treat has been sold and added to the catalog' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get catalog items
const getCatalog = async (req, res) => {
  try {
    const catalogItems = await Catalog.find({});
    if (!catalogItems || catalogItems.length === 0) {
      return res.status(404).json({ message: 'No catalog items found' });
    }
    res.status(200).json({ data: catalogItems });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE CATALOG ITEMS
const deleteCatalogItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCatalogItem = await Catalog.findByIdAndDelete(id);
    if (!deletedCatalogItem) {
      return res.status(404).json({ message: 'Catalog item not found' });
    }
    res.status(200).json({ data: deletedCatalogItem, message: 'Catalog item deleted successfully' });
  } catch (err) {
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
  deleteCatalogItem
};
