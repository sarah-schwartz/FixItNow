const Ticket = require('../models/Ticket'); 
async function addTicket(req, res) {
    try {
          console.log("POST /api/requests called");

        console.log("New request:", req.body);

        const { description, status = 'open', createdBy, assignedTo, responses = [] } = req.body;

        if (  !description || !createdBy) {
            return res.status(400).json({ message: 'Missing required fields: title, description, or createdBy' });
        }

        const ticket = new Ticket({  status, description, createdBy, assignedTo, responses });
        await ticket.save();

        res.status(201).json(ticket);
    } catch (error) {
          console.error("Error saving request:", error); 
        res.status(500).json({ message: error.message });
    }
}

async function getAllTicketsByUserID(req, res) {
    try {
        const { id } = req.params;
        //const user = req.user;
        if (!id ) {
            return res.status(400).json({ message: 'Invalid user info' });
        }

        const tickets = await Ticket.find({ createdBy: id});
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getTicketByID(req, res) {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllOpenTickets(req, res) {
    try {
        const tickets = await Ticket.find({ status: 'open' });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addTicket,
    getAllTicketsByUserID,
    getTicketByID,
    getAllOpenTickets
};
