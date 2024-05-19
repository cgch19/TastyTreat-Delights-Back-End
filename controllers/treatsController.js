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
const createYourtreats = async (req, res) => {
    try {
        const createdFavoriteArtist = await db.YourTreats.create({...req.body, User: req.user.id })
        createdYourtreats.save()
        console.log(createdYourtreats)
        if (!createYourtreats) {
            res.status(400).json({ message: "Cannot create your treats" })
        } else {
            res.status(201).json({ data: createdFavoriteArtist, message: "Your treats created" })
        }
    } catch (err) { res.status(400).json({ error: err.message }) }
}

module.exports = {
    getYourtreats,
    createYourtreats
}


