const express =require("express")
const Item = require("../models/item")
const Comment = require("../models/comment")
const auth = require("../middleware/auth")
const router = new express.Router()


router.post('/',auth,async(req,res)=>{
    const item = new Item({
        ...req.body,
        owner:req.user._id
    })
    try{
        await item.save() 
        res.status(201).send(item)
    }catch(err){
        res.status(400).send(err)
    }
})

//Get /items?size=a
router.get('/',async(req,res)=>{
    const filter = req.query
    try{
        const items = await Item.find(filter)
        res.send(items)
    }catch(err){
        res.status(500).send(err)
    }
})

router.get('/:item_id',async(req,res)=>{
    try{
        const item = await Item.findOne({_id:req.params.item_id})
        if(!item) return res.status(404).send()
        res.send(item)
    }catch(err){
        res.status(500).send(err)
    }
})

router.patch('/:item_id',auth,async(req,res)=>{
    const updates = Object.keys(req.query)
    try{
        const item = await Item.findOne({_id:req.params.item_id, owner:req.user._id})
        updates.forEach((update)=> item[update]=req.query[update])
        await item.save()
        res.send(item)
    }catch(err){
        res.status(400).send(err)
    }
})

router.delete('/:item_id',auth,async(req,res)=>{
    try{
        const item = await Item.findOne({_id:req.params.item_id,owner:req.user._id})
        if(!item)return res.status(404).send()
        const comments = item.comments
        comments.forEach(async(comment_id)=>{
            await Comment.findByIdAndDelete(comment_id)
        })
        await Item.findByIdAndDelete(req.params.item_id)
        res.send(item)
    }catch(err){
        res.status(500).send(err)
    }
})

module.exports = router