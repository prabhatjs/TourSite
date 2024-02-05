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

const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`server start on ${port}`);
})
