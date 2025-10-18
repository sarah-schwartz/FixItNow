const express = require('express');
const router = express.Router();

const {
    addTicket,
    getAllTicketsByUserID,
    getTicketByID,
    getAllOpenTickets,
    setStatus,
    getAllTickets,
    getOpenTicketsByAssignedUser
} = require('../controllers/ticketController');

const { verifyToken } = require('../middleware/auth');


router.post('/', verifyToken, addTicket);

router.get('/my-tickets/:id', verifyToken, getAllTicketsByUserID);

router.get('/:id', verifyToken, getTicketByID);

router.get('/getAllOpenTickets', verifyToken, getAllOpenTickets);

router.get('/', verifyToken, getAllTickets);

router.get('/assigned-to-me/:id', getOpenTicketsByAssignedUser);


router.put('/setStatus/:id',setStatus)

module.exports = router;
