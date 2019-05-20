const mongoose = require('mongoose')
const Item = require('../models/item')
const Comment = require('../models/comment')
//const jwt= require('jsonwebtoken')

const commentOneId = new mongoose.Types.ObjectId()
const commentOne ={
    _id: commentOneId,
    text:"Hello there",
    user:"Abc"
}

const itemOne ={
    _id: new mongoose.Types.ObjectId(),
    name:'itemOne'
}

const itemTwo ={
    _id: new mongoose.Types.ObjectId(),
    name:'itemTwo',
    size:'S'
}
const setupDatabase = async()=>{
    // try{
    //     await Item.deleteMany()
    //     await Comment.deleteMany()
    //     await new Comment(commentOne).save()
    //     itemOne.comments = []
    //     itemOne.comments.push(commentOneId)
    //     await new Item(itemOne).save()
    //     await new Item(itemTwo).save()
    // }catch(err){
    //     console.log(err)
    // }
}

module.exports = {
    setupDatabase
}
