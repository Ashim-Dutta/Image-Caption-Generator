const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        requires:true
    },
    password: {
        type:String
    }
})

const postModel = mongoose.model("user", userSchema)
module.exports = postModel

