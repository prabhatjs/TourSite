const express=require('express');
const tour=require('../models/tourmodel');

//this middleware use to filter 5 chipest tours..
const topcheapTour=async(req,res,next)=>{
       req.query.limit='5';
       req.query.sort='price'
       req.query.field='name,price,ratingsAverage,summary,difficulty'
       next();
}
//top higest price tour
const mostHigestPrice=async(req,res,next)=>{
    req.query.limit='5';
    req.query.sort='-price'
    req.query.field='name,price,ratingsAverage,summary,difficulty'
    next();
    }
const getTour=async(req,res)=>{
   try {
        const copyquery={...req.query};  
        const excluded=['sort','page','field','limit'];
        excluded.forEach(elementPresnt=>delete copyquery[elementPresnt]);
        /*  
        http://localhost:8000/api/v1/getTour?difficulty=easy&price[gte]=25000
        */
        let queryString=JSON.stringify(copyquery);
        queryString=queryString.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);//for price greater then equal check
        let gettourdata= tour.find(JSON.parse(queryString));// the process of converting a JSON object in text format to a Javascript object that can be used inside a program.
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
        //http://localhost:8000/api/v1/getTour?page=4&limit=2
        gettourdata=gettourdata.skip(skip).limit(limit);
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
    /**aggrigationggregation operations process multiple documents and return computed results. 
     * You can use aggregation operations to:
        Group values from multiple documents together.
        Perform operations on the grouped data to return a single result.
        Analyze data changes over time.
*/
    const getTourStatus= async(req,res)=>{
            try {
                const stats= await tour.aggregate([
                    {   
                        $match:{ratingsAverage:{$gte:4}}
                    },{
                        $group:{
                            noTour:{$sum:1},
                            _id:'$difficulty',
                            avgRating:{$avg:'$ratingsAverage'},
                            avgPrice:{$avg:'$price'},
                            minPrice:{$min:'$price'},
                            maxPrice:{$max:'$price'}
                        }
                    }
                ]);
                res.status(200).json({
                    message:"Success get Aggrgate",
                    data:{
                        stats
                    }
                   });
            } catch (error) {
                res.status(404).json({
                    message:"Aggrigation fail",
                    data:{},
                    error:error
                })
            }
    }
    //find the besy month of the tour every tour has 3 starting date find which month have max number of tour..
        const BusyMonth=async (req,res)=>{
           try {
            const year=req.params.year*1;
            const plan=await tour.aggregate([
                 {
                    $unwind:'$startDates'//if one array contain multiple value unwind help to seprate ,destructure
                 },
                 {
                 $match:
                 {
                    startDates:
                    {
                        $gte:new Date(`${year}-01-01`),
                        $lte:new Date(`${year}-12-31`)
                    }
                 }
                }])
            res.status(200).json({
                message:"Success get Aggrgate",
                data:{
                    plan
                }
               });
           } catch (error) {
            res.status(404).json({
                message:"Aggrigation fail",
                data:{},
                error:error
            })
           }
        }
    module.exports={
        getTour,getTourById,DeleteTour,PostTour,
        updateTour,topcheapTour,mostHigestPrice,
        getTourStatus,BusyMonth
    }