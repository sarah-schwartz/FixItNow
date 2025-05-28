const jwt = require("jsonwebtoken");

function createToken(req, res, next) {
    try {
        // הנחה ש־req.user מלא עם הנתונים הנכונים (userName, id, role)
        const { userName, id, role } = req.user;

        if (!userName) {
            return res.status(400).json({ message: "Missing user name" });
        }

        const token = jwt.sign({ userName, id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        req.token = token;

        next();
    } catch (error) {
        res.status(500).json({ message: "Error creating token", error });
    }
}

function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - Token malformed" });
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token", error: error.message });
    }
}

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // userName, id, role
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = { createToken, verifyToken, authenticateJWT };
