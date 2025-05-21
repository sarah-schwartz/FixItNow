const mongoose = require('mongoose');

const ResponseModel = mongoose.Schema({
    ticketId: {type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    responses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Response' }]
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ResponseModel);
