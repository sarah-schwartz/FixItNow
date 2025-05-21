const mongoose = require('mongoose');
//const { options } = require('../Routers/toyRouter');

const TicketTypeModel = mongoose.Schema({
name:{ type: String,
    enum: ['permissions', 'changes', 'serverFarmInquiries'], 
    required: true },
//options: [{ type: String }] 
});
module.exports = mongoose.model("TicketType",TicketTypeModel)