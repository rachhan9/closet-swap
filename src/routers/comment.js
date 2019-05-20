const express = require('express')
const router = new express.Router({mergeParams:true})
const Comment = require('../models/comment')
const auth = require("../middleware/auth")
const Item = require("../models/item")


// Get /items/:item_id/comment
router.get('/',async(req,res)=>{
    try{
        const allComments = await Item.findOne({_id:req.params.item_id}).populate("comments")
        res.send(allComments.comments)
    }catch(err){
        res.status(400).send(err)
    }
})

router.post('/',auth,async(req,res)=>{
    try{
        const item = await Item.findById(req.params.item_id)
        const newComment = new Comment({
            ...req.body,
            owner:req.user._id
        })
        await newComment.save()
        item.comments.push(newComment._id)
        await item.save()
        res.status(201).send(item)
    }catch(err){
        res.status(400).send(err)
    }
})


router.get('/:comment_id', async(req,res)=>{
    try{
        const comment = await Comment.findById(req.params.comment_id)
        if(!comment)return res.status(404).send()
        res.send(comment)
    }catch(err){
        res.status(500).send(e)
    }
})

router.patch('/:comment_id',auth,async(req,res)=>{
    try{
        const updates = Object.keys(req.body)
        const comment = await Comment.findOne({_id:req.params.comment_id,owner:req.user._id})
        updates.forEach((update)=> comment[update]=req.body[update])
        await comment.save()
        res.send(comment)
    }catch(err){
        res.status(400).send(err)
    }
})

router.delete('/:comment_id',auth,async(req,res)=>{
    try{
        const comment_id = req.params.comment_id
        const item = await Item.findById(req.params.item_id)
        const comment = await Comment.findOneAndDelete({_id:req.params.comment_id,owner:req.user._id})
        if(!item || ! comment)return res.status(404).send()
        const index = item.comments.indexOf(comment_id)
        if(index > -1) item.comments.splice(index,1)
        await item.save()
        res.redirect(`/items/${req.params.item_id}/comment`)
    }catch(err){
        res.status(500).send(err)
    }
})

module.exports = router