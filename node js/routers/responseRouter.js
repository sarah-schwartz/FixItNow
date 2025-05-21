const express = require("express")
const router = express.Router()
const { getResponseByID, addResponse} = require("../controllers/responseController")

router.get("/getResponseByID/:id", getResponseByID)
router.post("/addResponse", addResponse)

module.exports = router