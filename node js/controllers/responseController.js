const res = require("express/lib/response")
const Response = require("../models/Response")

async function getResponseByID(req,res){
    let response = await Response.find(req.params)
    res.send(response).status(200)
}

async function addResponse(req,res){
    let newGame = await new Response(req.body)
    await newGame.save()
    res.send("created successful" + newGame)
}

module.exports={getResponseByID, addResponse}