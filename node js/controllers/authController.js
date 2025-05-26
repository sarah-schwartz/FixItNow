const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require("../models/User")

const register = async (req,res)=>{
    
    const {userName, password,role, email} = req.body

    if (!role || !userName || !password || !email) {
        return res.status(400).json({message:'All fields are required'+req.body.role})
    }

    const duplicate = await User.findOne({userName:userName}).lean()
    if(duplicate){
        return res.status(409).json({message:"Duplicate userName"})
    }

    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject= {userName,password:hashedPwd,role,email}
    const user = await User.create(userObject)
    if (user) { 
        const token = jwt.sign(
            {
                userName: user.userName,
                role: user.role,
                email: user.email,
                id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        return res.status(200).json({
            message: `New user ${user.userName} created`,
            token,
        });
    } 
    else {
        return res.status(400).json({message:'Invalid user received'})
    }
}

const login = async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const foundUser = await User.findOne({ userName }).lean();
    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
        return res.status(401).json({ message: 'Unauthorized: Incorrect password' });
    }
    const token = jwt.sign(
        {
            userName: foundUser.userName,
            role: foundUser.role,
            email: foundUser.email,
            id: foundUser._id
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    // החזרת המשתמש + טוקן (או רק טוקן לפי הצורך)
    res.status(200).json(token);

    //res.status(200).send(foundUser);
};

module.exports = {login, register}