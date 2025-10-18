const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { userName, password, role, email } = req.body;

    if (!role || !userName || !password || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const duplicate = await User.findOne({ userName }).lean();
    if (duplicate) {
      return res.status(409).json({ message: "Duplicate userName" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const userObject = {
      userName,
      password: hashedPwd,
      role,
      email,
    };

    const user = await User.create(userObject);
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

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
        path: '/' // ensure cookie is available site-wide
      });

      console.log("Token created and cookie set:", token);

      return res.status(200).json({
        message: `New user ${user.userName} created`,
        success: true
      });
    } else {
      return res.status(400).json({ message: 'Invalid user data received' });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ userName });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        userName: user.userName,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log(token)

    // Set cookie with proper options
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: '/' // ensure cookie is available site-wide
    });

    console.log("Login successful, token set in cookie:", token);

    return res.status(200).json({
      message: "Login successful",
      success: true
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login, register };