const res = require("express/lib/response")
const User = require("../models/User")


async function addUser(req,res){
    let newC = await new User(req.body)
    await newC.save()
    res.json({ message: "created successfully"+newC });
    //res.send("created successful" + newC)
}
async function getUserbyName(req, res) {
    try {
        const user = await User.findOne({ userName: req.params.userName });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: "Server error", error: err });
    }
}


module.exports={addUser,getUserbyName}