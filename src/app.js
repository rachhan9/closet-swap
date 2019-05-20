const express = require('express')
require('./db/mongoose')
const bodyParser = require("body-parser")
const userRouter = require("./routers/user")
const itemRouter = require("./routers/item")
const commentRouter = require("./routers/comment")
//const jwt = require("jsonwebtoken")
const app = express()
const {setupDatabase} = require('./db/db')
setupDatabase()


app.use(express.json())

app.use(bodyParser.urlencoded({extended:true}));
app.use("/user",userRouter)
app.use("/items",itemRouter)
app.use("/items/:item_id/comment",commentRouter)



module.exports = app
