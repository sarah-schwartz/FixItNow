const res = require("express/lib/response")
const TicketType = require("../models/TicketType")

async function addTicketType(req, res) {
    try {
        let newGame = new TicketType(req.body);
        await newGame.save();
        res.send("created successful " + newGame);
    } catch (error) {
        res.status(500).send("Error creating ticket type: " + error.message);
    }
}

async function getTicketTypeByID(req, res) {
    try {
        const { id } = req.params;
        console.log(id)
        const ticketType = await TicketType.findById(id);

        if (!ticketType) {
            return res.status(404).send({ message: 'TicketType not found' });
        }

        res.status(200).send(ticketType);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving ticket type', error: error.message });
    }
}

module.exports = {
    addTicketType,
    getTicketTypeByID
};
