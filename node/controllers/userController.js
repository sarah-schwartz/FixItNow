const res = require("express/lib/response")
const User = require("../models/User")


// async function addUser(req,res){
//     let newC = await new User(req.body)
//     await newC.save()
//     res.json({ message: "created successfully"+newC });
// }
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
async function getUserbyId(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({
            user,
            token: req.token || null 
        });
    } catch (err) {
        res.status(500).send({ message: "Server error", error: err.message });
    }
}
async function getAllUsers(req, res) {
    try {
        const users = await User.find().select('_id userName email role');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
}

module.exports={getUserbyName,getUserbyId,getAllUsers}