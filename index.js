const express=require('express');
const app=express();
const fs=require('fs');
const port=3000;
app.use(express.json());//change all incoming data into json middelware,
    //!request from clinet side---response from server side,status method use for api status code 
    const data=JSON.parse(fs.readFileSync('./data/tourdata.json','utf-8'));//parse the data in json formate 
    const getTour=(req,res)=>{
        res.
            status(200)
            .json({
                result:data.length,//length of data
                message:"Hello From server",
                app:"tourApp",
                data:data
            });
        }
        const PostTour=(req,res)=>{
            console.log(req.body);
            res.send('done');
        }
        const getTourById=(req,res)=>{
            const id=Number(req.params.id);//change the id into number
            //handling eror of invalid ids---
            if(id>data.length){
                res.status(404).json({
                    message:"fail",
                    error:"Invalid ID"
                });
            }
            //find in to json collection data ,find method take cll back function
            const tour=data.find((tourid)=>
                    tourid.id===id)
            res.
            status(200)
            .json({
                message:"Hello From server",
                app:"tourApp",
                data:tour
            });
        }
    app.get('/api/v1/getTour',getTour)
    app.post('/api/v1/getTour',PostTour)//if u want parameter want to option add ' ? ' this is not getting error
    app.get('/api/v1/getTour/:id/:id2?',getTourById)

app.listen(port,()=>{
    console.log(`server start on ${port}`);
})
