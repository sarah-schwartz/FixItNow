const Ticket = require('../models/ticketModel'); 
async function addTicket(req, res) {
    try {
        const { description, status = 'open', createdBy, assignedTo, responses = [] } = req.body;

        if (  !description || !createdBy) {
            return res.status(400).json({ message: 'Missing required fields: title, description, or createdBy' });
        }

        const ticket = new Ticket({  status, description, createdBy, assignedTo, responses });
        await ticket.save();

        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllTicketsByUserID(req, res) {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(400).json({ message: 'Invalid user info' });
        }

        const tickets = await Ticket.find({ createdBy: user._id });
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
