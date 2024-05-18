const db = require("../models")

const getYourtreats = async (req, res) => {
    try {
        const foundTreats = await db.YourTreats.find({User: req.user.id })
        console.log(foundArtist)
        if (!foundTreats) {
            res.status(404).json({ message: "Cannot find treats" })
        } else {
            res.status(200).json({ data: foundTreats })
        }
    } catch (err) { res.status(400).json({ error: err.message }) }
}

module.exports = {
    getYourtreats
}


