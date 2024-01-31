const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=require('../index.js');
console.log(app.get("env"));//print the which enviorment you use development or production,bydefault development enviorment set
dotenv.config({path:'config.env'});

//console.log(process.env);




mongoose.connect(process.env.DATABASE_LOCAL,{
}).then(()=>
    console.log("connect to Database")
)

const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:4.5
    },
    price:{
        type:Number,
        required:true
    }
})

const tour=mongoose.model('Tour',tourSchema);
//saave data
const savetour=new tour({
    name:"Delhi Tour",
    rating:3,
    price:25000
})
savetour.save().then(doc=>{
    console.log(doc);
}).catch(err=>{
    console.log(err);
});

const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`server start on ${port}`);
})
