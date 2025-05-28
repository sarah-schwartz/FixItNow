const express = require('express');
const router = express.Router();

const {
    addTicket,
    getAllTicketsByUserID,
    getTicketByID,
    getAllOpenTickets
} = require('../controllers/ticketController');

const {verifyToken} = require('../middleware/auth');
console.log("addTicket:", addTicket ); // ← אמור להדפיס פונקציה


router.post('/', verifyToken, addTicket);

router.get('/my-tickets/:id', getAllTicketsByUserID);

router.get('/:id', getTicketByID);

router.get('/', verifyToken, getAllOpenTickets);

module.exports = router;
