const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    creator:{
        type:String,
    },
    title:{
        type:String,
    },
    message:{
        type:String,
    },
    tag:{
        type:String,
    },
    image:{
        type:String,
    },
    cloudinary_id:{
        type:String
    },
    like:{
        type:Number,
        default:0
    }
})

const POST=new mongoose.model('post',postSchema)
module.exports=POST