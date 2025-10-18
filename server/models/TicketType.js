const mongoose = require('mongoose');

const TicketTypeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    enum: ['permissions', 'changes', 'database_access', 'file_directory_access', 'code_help', 'technical_help', 'change_request', 'other'], 
    required: true 
  },
  category: { 
        type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
    required: true,
  }
});

module.exports = mongoose.model("TicketType", TicketTypeSchema);
  