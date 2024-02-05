const express=require('express');
const app=express();
const tourRouter=require('./routes/tourRoutes');
const userRouter=require('./routes/userRoute');
const fs=require('fs');
const winston=require('winston');

app.use(express.json());//change all incoming data into json middelware,

const logger=winston.createLogger({
    level:"info",
    format:winston.format.json(),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({filename:"mylog.log"})
    ]
});
logger.info("hello winston");
logger.error("Something went wrong",{
    error:new Error("something going wrong")
});
app.use((req,res,next)=>{
    console.log("hllow from middleware");
    next();
});
app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    console.log(req.requestTime);
    next();
})

//use middelware to short path,mounthing the router
app.use('/api/v1/getTour',tourRouter);
app.use('/api/v1/user',userRouter);

module.exports=app;