const Ticket = require('../models/Ticket');
async function addTicket(req, res) {
    try {
        console.log("New request:", req.body);
        const {
            title,
            description,
            status = 'waiting',
            createdBy,
            type,
            assignedTo,
            priority,
            fieldValues
        } = req.body;

        if (!title || !createdBy || !type || !assignedTo || !priority) {
            return res.status(400).json({
                message: 'Missing required fields: title, createdBy, type, assignedTo, category or priority'
            });
        }

        const ticket = new Ticket({
            title,
            description,
            status,
            createdBy,
            type,
            assignedTo,
            priority,
            fieldValues
        });

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
        if (!id) {
            return res.status(400).json({ message: 'Invalid user info' });
        }

        const tickets = await Ticket.find({ createdBy: id });
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
        const tickets = await Ticket.find({ status: { $ne: 'closed' } });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function setStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        console.log("fhtrth "+id+" "+status)

        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).send("Ticket not found");
        }

        ticket.status = status;
        await ticket.save();

        res.send("Status updated");
    } catch (err) {
        console.error("Error updating status:", err);
        res.status(500).send("Server error");
    }
}


async function getAllTickets(req, res) {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getOpenTicketsByAssignedUser(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'User ID is required in params' });
        }

        const openTickets = await Ticket.find({
            assignedTo: id,
            status: { $ne: 'closed' }
        })
            .populate('createdBy', 'userName email role') 
            .populate('assignedTo', 'userName email role') 
            .populate('type', 'name'); 

        if (!openTickets.length) {
            return res.status(404).json({ message: 'No open tickets found for this user' });
        }

        res.status(200).json(openTickets);

    } catch (error) {
        console.error("Error fetching open tickets for assigned user:", error);
        res.status(500).json({ message: 'Server error while fetching tickets', error: error.message });
    }
}

module.exports = {
    addTicket,
    getAllTicketsByUserID,
    getTicketByID,
    getAllOpenTickets,
    setStatus,
    getAllTickets,
    getOpenTicketsByAssignedUser
};
