const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const POST = require('../models/postSchema')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'nazmul-haq',
    api_key: '766645492229863',
    api_secret: 'Ovx-5LezkfDqt05b31tgLpA_nS0'
})
router.get('/test', auth, async (req, res) => {
    res.json('success')
})
//get all post
router.get('/getpost', auth, async (req, res) => {
    const result = await POST.find()
    res.json(result)
})
//creat post
router.post('/createpost', auth, async (req, res) => {
    // console.log(req.files)
    // res.json('getost')
    const { creator, title, message, tag } = req.body
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)
    console.log(result)
    const duco = new POST({ creator, title, tag, message, image: result.secure_url, cloudinary_id: result.public_id })
    await duco.save()
    console.log(duco)
    res.json(duco)
})
//update post
router.patch('/updatepost/:id',async(req,res)=>{
    console.log(req.body)
    const _id=req.params.id
    // console.log('update')
    var result
    if(!req.files){
         result=await POST.findByIdAndUpdate(_id,req.body,{new:true})
    }
    res.json(result)
})
//delet post
router.delete('/deletepost/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const data = await POST.findByIdAndDelete({ _id })
    res.json(data)
})
//like
router.post('/like', auth, async (req, res) => {
    //    const result=await POST.
    const { id } = req.body
    var result = await POST.findOne({ _id: id })
    result.like = result.like+1;
    const data= await result.save()
    console.log(data)
    res.json(data)
})
module.exports = router