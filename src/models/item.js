const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String
    },
    size:{
        type:String,
    },
    description:{
        type:String,
        trim: true
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})



const Item = mongoose.model('Item',itemSchema)
module.exports = Item