const mongoose = require('mongoose');

const FieldModel = new mongoose.Schema({
  fieldName: { type: String, required: true },
  labelKey: { type: String, required: true },
  type: { type: String, required: true },
  options: [String] 
});
module.exports = mongoose.model('Field', FieldModel);
