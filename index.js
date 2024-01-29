const express=require('express');
const app=express();
const fs=require('fs');
const port=3000;
app.use(express.json());//change all incoming data into json middelware,
//own middelware
const router=express.Router();
app.use((req,res,next)=>{
    console.log("hllow from middleware");
    next();
});

app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    console.log(req.requestTime);
    next();
})


    //!request from clinet side---response from server side,status method use for api status code 
    const data=JSON.parse(fs.readFileSync('./data/tourdata.json','utf-8'));//parse the data in json formate 
    const getTour=(req,res)=>{
        res.
            status(200)
            .json({
                requestTime:req.requestTime,
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

        const updateTour=(req,res)=>{
            console.log(req.body);
            res.send('done');
        }

        const DeleteTour=(req,res)=>{
            console.log(req.body);
            res.send('done');
        }

    // app.get('/api/v1/getTour',getTour)
    // app.post('/api/v1/getTour',PostTour)
    // //if u want parameter want to option add ' ? ' this is not getting error
    // app.get('/api/v1/getTour/:id/:id2?',getTourById)
    // app.patch('/api/v1/getTour/:id',updateTour);
    // app.delete('/api/v1/getTour/:id',DeleteTour);
 // if u want parameter want to option add ' ? ' this is not getting error

        app.route('/api/v1/getTour')
        .get(getTour)
        .post(PostTour);

        app.route('/api/v1/getTour/:id')
        .get(getTourById)
        .patch(updateTour)
        .delete(DeleteTour);

app.listen(port,()=>{
    console.log(`server start on ${port}`);
})
