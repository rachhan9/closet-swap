const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
    text: {
        type:String,
        required:true,
        trim:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Comment = mongoose.model('Comment',commentSchema)
module.exports = Comment

