const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type: Number,
        required:true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
},{
    timestamps:true
})

userSchema.virtual('comments',{
    ref:'Comment',
    localField:'_id',
    foreignField:'owner'
})
userSchema.virtual('items',{
    ref:'Item',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()},"MYSECRET",{expiresIn:'2h'})
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (username, password) =>{
    const user = await User.findOne({username})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.pre('remove', async function(next){
    const user = this
    console.log(await Task.deleteMany({owner: user._id}))
    next()
})


const User = mongoose.model('User',userSchema)
module.exports = User
