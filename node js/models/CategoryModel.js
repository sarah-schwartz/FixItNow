const mongoose = require('mongoose');
const FieldSchema = require('./Field');  
const CategoryModel = new mongoose.Schema({
  name: { type: String, required: true },
  fields: [FieldSchema]
});

module.exports = mongoose.model('Category', CategoryModel);

