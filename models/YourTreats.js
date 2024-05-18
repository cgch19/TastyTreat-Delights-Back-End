const {default: mongoose} = require("mongoose")
const User = require("./User")

const YourTreatsSchema = new mongoose.Schema({
    Product: String,
    Image: String,
    Description: String,
    Price: Number,
    User: {type: mongoose.Types.ObjectId, ref: User}
})

module.exports = mongoose.model("Yourtreats", YourTreatsSchema)