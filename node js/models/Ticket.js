const mongoose = require('mongoose');

const TicketSchema =new mongoose.Schema({
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['inProgress', 'waiting', 'closed'],
        default: 'waiting'
    },
    type:{type: mongoose.Schema.Types.ObjectId,ref:'TicketType',required: true},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    responses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Response' }]
}, { timestamps: true });
delete mongoose.connection.models['Ticket'];
module.exports = mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);
