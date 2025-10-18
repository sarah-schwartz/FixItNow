const express = require("express")
const router = express.Router()
const { getResponseByID, addResponse,addResponseToTicket} = require("../controllers/responseController")

router.get("/getResponseByID/:id", getResponseByID)
router.post("/addResponse", addResponse)
router.post("/addResponseToTicket",addResponseToTicket)

module.exports = router