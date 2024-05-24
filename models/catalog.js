const mongoose = require('mongoose');
const TreatSchema = require('./YourTreats').schema;

const Catalog = mongoose.model('Catalog', TreatSchema);

module.exports = Catalog;