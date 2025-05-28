const res = require("express/lib/response")
const Response = require("../models/Response")

async function getResponseByID(req, res) {
  try {
    const response = await Response.findById(req.params.id);
    if (!response) {
      return res.status(404).send({ message: "Response not found" });
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
}


async function addResponse(req,res){
    let newGame = await new Response(req.body)
    await newGame.save()
    res.send("created successful" + newGame)
}

module.exports={getResponseByID, addResponse}