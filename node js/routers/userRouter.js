const express = require("express")
const router = express.Router()
const { addUser,getUserbyName} = require("../controllers/userController")

router.post("/addUser", addUser)
router.get("/getUserByName/:userName",getUserbyName)

module.exports = router