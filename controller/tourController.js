const express=require('express');
const fs=require('fs');

const data=JSON.parse(fs.readFileSync('./data/tourdata.json','utf-8'));//parse the data in json formate 
/**
 * 
 *first define method 
 second define router
 third define routes
 */
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
        console.log(id,data.length);
        const tour=data.find((tourid)=>tourid.id===id)
        if(!tour){
           return res.status(404).json({
                message:"fail",
                error:"Invalid ID",
                data:{}
            });
        }
        //find in to json collection data ,find method take cll back function
        res.status(200)
        .json({
            requestTime:req.requestTime,
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

    module.exports={
        getTour,getTourById,DeleteTour,PostTour,updateTour
    }