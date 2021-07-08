const mongoose=require("mongoose");
// const DB='mongodb+srv://nazmul:12345@cluster0.p9fv0.mongodb.net/e-commerce_example?retryWrites=true&w=majority'
// 'mongodb://localhost:27017/more_model_connect'
mongoose.connect('mongodb://localhost:27017/full-auth-email-google-facebook',{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>console.log("mongodb connection successfull....."))
.catch((err)=>console.log(err));