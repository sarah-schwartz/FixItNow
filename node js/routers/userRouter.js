const express = require("express")
const router = express.Router()
const {getUserbyName,getUserbyId} = require("../controllers/userController")

router.get("/getUserByName/:userName",getUserbyName)
router.get("/getUserById/:id",getUserbyId)


module.exports = router