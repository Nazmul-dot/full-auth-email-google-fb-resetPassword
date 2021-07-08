require('dotenv').config();
const express=require("express");
const app=express();
const cookieParser = require("cookie-parser")
const fileUpload = require('express-fileupload')
require('./db/conn')

// set cookie
app.use(cookieParser())
// for json data
app.use(express.json())
// get image/file
app.use(fileUpload({
    useTempFiles: true
}))

app.use(require('./routes/userRouter'))
app.use(require('./routes/postRouter'))


const port=process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`port running on ${port}`)
})