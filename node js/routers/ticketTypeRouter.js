const express = require("express")
const router = express.Router()
const { addTicketType} = require("../controllers/ticketTypeController")

router.post("/addTicketType", addTicketType)

module.exports = router