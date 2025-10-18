const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
  fieldName: { type: String, required: true },
  labelKey: { type: String, required: true },
  type: { type: String, required: true },
  options: [String]
});

module.exports = FieldSchema; 
