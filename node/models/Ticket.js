const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    description: { type: String },
    status: {
        type: String,
        enum: ['inProgress', 'waiting', 'closed'],
        default: 'waiting'
    },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'TicketType', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'], 
        required: true
    },
    fieldValues: [{
        fieldName: { type: String, required: true },
        value: { type: mongoose.Schema.Types.Mixed } 
    }],
    responses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Response' }]
}, { timestamps: true });

module.exports = mongoose.model("Ticket", TicketSchema);
