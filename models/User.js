const {default: mongoose} = require("mongoose")


const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique:true},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    //https://www.slingacademy.com/article/how-to-use-enums-in-mongoose-a-practical-guide/
    //https://thewebdev.info/2022/02/28/how-to-create-and-use-enums-in-mongoose/
    // use this
    role: {type: String, enum: ['Admin', 'User'], default: 'User'}
})



module.exports = mongoose.model("User", userSchema)
//d