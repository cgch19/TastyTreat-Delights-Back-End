const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env

const createToken = (user) => {
    try {
        const token = jwt.sign({ 
            id: user._id, 
            email: user.email, 
            username: user.username 
        }, JWT_SECRET, { expiresIn: '1d' })
        return token
    } catch (err) {
        console.log(err)
    }
}

const verifyToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"].split(" ")[1];
        console.log(bearerHeader, " <-- this is bearerheader")
        if (!bearerHeader) {
            return res.status(403).json({ error: "You don't have permission to access this page" })
        }

        const decoded = jwt.verify(bearerHeader, JWT_SECRET)
        if (!decoded) {
            return res.status(400)
        }
        req.user = decoded;
        next()
    } catch (err) {
        console.log(err)
        if(err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: "Expired authentication token" })
        }
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {
    createToken,
    verifyToken
}