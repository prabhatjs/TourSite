const express=require('express');
const tour=require('../models/tourmodel');

//this middleware use to filter 5 chipest tours..
const topcheapTour=async(req,res,next)=>{
       req.query.limit='5';
       req.query.sort='price'
       req.query.field='name,price,ratingsAverage,summary,difficulty'
       next();
       //jab top-cheaptour vale route to hite krenge to limit or sort or filed ki value automatic fill ho jayegngi or gettour vala method chalega
}
//top higest price tour
const mostHigestPrice=async(req,res,next)=>{
    req.query.limit='5';
    req.query.sort='-price'
    req.query.field='name,price,ratingsAverage,summary,difficulty'
    next();
    }

//all method return promise then we use async await 
const getTour=async(req,res)=>{
   try {
        /* !--how to filter data ---
        find data by query object query object look like this--> ?duration=5&difficulty=easy
         console.log(req.query);//this will return { duration: '5', difficulty: 'easy' } object like this and you can use easy put in query
        how to filter data 
        first we create copy of query sting
        second create array of excluded fields in query object
        third remove this query object filds sort limit
        */
        const copyquery={...req.query};  
        const excluded=['sort','page','field','limit'];
        excluded.forEach(elementPresnt=>delete copyquery[elementPresnt]);
        /*
        why we need ...spred operator because query object contains many thing duration ,sort, paginatio,
         console.log(req.query,excluded)//copyquery);       
        http://localhost:8000/api/v1/getTour?difficulty=easy&price[gte]=25000
        console.log(JSON.stringify(queryString),queryString,JSON.parse(queryString));
        */
        //change the request in json formt for grater then,less then greaterthen equal,less then equal check
        let queryString=JSON.stringify(copyquery);
        queryString=queryString.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);//for price greater then equal check
        let gettourdata= tour.find(JSON.parse(queryString));// the process of converting a JSON object in text format to a Javascript object that can be used inside a program.
        //implement the sorting like by price lower to higher
        //agr req.query.sort milti the to ye if chelgei or getdata varible me sort kregei

        //sorting
        if(req.query.sort)
        {
            gettourdata=gettourdata.sort(req.query.sort)
        }
        //limiting the fileds--->http://localhost:8000/api/v1/getTour?field=name,duration,price pass like this
        if(req.query.field){
            const field=req.query.field.split(',').join(' ');
            gettourdata.select(field);
        }else{
            gettourdata=gettourdata.select('');
        }
        //pagination

        const page=req.query.page;//page=1
        const limit=req.query.limit;//limit=2
        const skip=(page-1)*limit;  

        gettourdata=gettourdata.skip(skip).limit(limit);
        //http://localhost:8000/api/v1/getTour?page=4&limit=2
        if(req.query.page){
            const numofTours=await tour.countDocuments();
            if(skip>=numofTours)throw new Error('This page does not exist');
        }

        const tours = await gettourdata;
        res.status(200).json({
            result:gettourdata.length,
            message:"Success",
            data:{
                tours
            }
           });
   } catch (error) {
    res.status(404).json({
        message:"Fail to find all tour",
        data:{},
        error:error
    })
   }
}
    const getChipestTour=async(req,res)=>{
        try {
            
        } catch (error) {
            
        }
    }
    const PostTour=async (req,res)=>{
        try {
            const createTour=await tour.create(req.body);
            res.status(200).json({
             message:"Success",
             data:{
                 createTour
             }
            });
        } 
        catch (error) {
            res.status(404).json({
                message:"Fail to create tour",
                data:{},
                error:error
            })
        }
    }
    const getTourById=async (req,res)=>{
        try {
           // const id=Number(req.params.id);
            const findtour= await tour.findById(req.params.id);
            res.status(200).json({
                message:"Success",
                data:{
                    findtour
                }
               });
        } catch (error) {
            res.status(404).json({
                message:"Fail to find tour",
                data:{},
                error:error
            })
        }}
    const updateTour=async (req,res)=>{
      try {
        const updatedTour=await tour.findByIdAndUpdate(req.params.id,req.body);

        res.status(200).json({
            message:"Success",
            data:{
                updatedTour
            }
           });
      } catch (error) {
        res.status(404).json({
            message:"Fail update tour data",
            data:{},
            error:error
        })
      }

    }
    const DeleteTour=async(req,res)=>{
       try {
        const deleteTour= await tour.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"Success",
            data:{
                deleteTour
            }
           });
       } catch (error) {
        res.status(404).json({
            message:"Fail update tour data",
            data:{},
            error:error
        })
       }
    }

    module.exports={
        getTour,getTourById,DeleteTour,PostTour,updateTour,topcheapTour,mostHigestPrice
    }