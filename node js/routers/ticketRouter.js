const express = require('express');
const router = express.Router();

const {
    addTicket,
    getAllTicketsByUserID,
    getTicketByID,
    getAllOpenTickets
} = require('../controllers/ticketController');

// const authenticate = require('../middleware/auth');

router.post('/', authenticate, addTicket);

router.get('/my-tickets', authenticate, getAllTicketsByUserID);

router.get('/:id', authenticate, getTicketByID);

router.get('/', authenticate, getAllOpenTickets);

module.exports = router;
