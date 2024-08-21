const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        match: [/\S+@\S+\.\S+/]      //Similarly Phone number validation is " match: [/^\+?[1-9]\d{1,14}$/] ".
    },
    age:{
        type:Number,
        required: true,
        max:110
    }
})

const UserModal = mongoose.model('users',userSchema)
module.exports = UserModal