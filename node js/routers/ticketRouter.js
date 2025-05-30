const express = require('express');
const router = express.Router();

const {
    addTicket,
    getAllTicketsByUserID,
    getTicketByID,
    getAllOpenTickets
} = require('../controllers/ticketController');

const {verifyToken} = require('../middleware/auth');


router.post('/', verifyToken, addTicket);

router.get('/my-tickets/:id',verifyToken, getAllTicketsByUserID);

router.get('/:id',verifyToken, getTicketByID);

router.get('/', verifyToken, getAllOpenTickets);

module.exports = router;
