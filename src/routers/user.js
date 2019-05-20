const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/', async(req,res)=>{
    const user = new User(req.body)
    try{
       await user.save()
       const token = await user.generateAuthToken()
       res.status(201).send({user,token})
    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/login', async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.username,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user:user,token})
    }catch(e){
        res.status(400).send()
    }
})
router.get('/me',auth,async(req,res)=>{
    res.send(req.user)
})

router.post('/logout',auth,async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/me',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    try{
        updates.forEach((update)=>{
            req.user[update]= req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})


module.exports = router