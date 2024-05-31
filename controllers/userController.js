const db = require("../models")
const { createToken } = require("../middleware/verifyToken")

const bcrypt = require("bcrypt")

const signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if username or email already exists
        const existingUser = await db.User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: "Username or email already taken." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new db.User({
            email,
            username,
            password: hashedPassword
        });
        await newUser.save();

        return res.status(201).json({ message: "User successfully registered", userId: newUser.id });
    } catch (err) {
        console.error("Error during signup:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};


const login = async (req, res) => {
    try {
        const { password, username } = req.body;

        // Find user by username
        const foundUser = await db.User.findOne({ username });

        // If user not found, return error
        if (!foundUser) {
            return res.status(400).json({ error: "Invalid login credentials" });
        }

        // Compare passwords
        const verifyPassword = await bcrypt.compare(password, foundUser.password);
        if (!verifyPassword) {
            return res.status(400).json({ error: "Invalid login credentials" });
        }

        // Generate token
        const token = createToken(foundUser);

        // Return token and user ID
        return res.status(200).json({ token, id: foundUser._id });
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
const getUser = async (req, res) => {

    try {
        const id = req.user.id
        const query = db.User.findById(id)

        query.select("-password")
        const foundUser = await query.exec()

        if (!foundUser) {
            return res.status(400).json({ error: "User not found" })
        }
        return res.status(200).json({ message: "Successfully found user", data: foundUser })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {
    signup,
    login,
    getUser
}