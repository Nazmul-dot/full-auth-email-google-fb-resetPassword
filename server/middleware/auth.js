const jwt=require("jsonwebtoken");
const USER=require('../models/userShcema');
const auth=async(req,res,next)=>{
    try {
        const token=req.cookies.jwtToken;
        console.log(token)
        const verifyuser=jwt.verify(token,process.env.KEY)
        console.log(verifyuser)
        const user=await USER.findOne({ _id: verifyuser._id})
        req.user=user;
        req.token=token;
        next();
    } catch (error) {
        console.log("error part from auth")
        res.send("<h1>plz login first to watch this page..........🥰</h1>")
    }
}
module.exports=auth;