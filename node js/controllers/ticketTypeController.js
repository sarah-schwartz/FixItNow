const res = require("express/lib/response")
const TicketType = require("../models/TicketType")


async function addTicketType(req,res){
    let newGame = await new TicketType(req.body)
    await newGame.save()
    res.send("created successful" + newGame)
}

module.exports={addTicketType}