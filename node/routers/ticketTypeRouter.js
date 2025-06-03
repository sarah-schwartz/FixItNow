const express = require("express")
const router = express.Router()
const { addTicketType,getTicketTypeByID} = require("../controllers/ticketTypeController")
const {verifyToken} = require('../middleware/auth');

router.post("/addTicketType",verifyToken, addTicketType)
router.get("/:id",verifyToken,getTicketTypeByID)
module.exports = router