const express=require('express');
const {getTour,getTourById,PostTour,DeleteTour,updateTour}=require('../controller/tourController')

const tourRouter=express.Router();
//[param middleware,val hold value of id]
    tourRouter.param('id',(req,res,next,val)=>{
        next();
        console.log(val);
    })
    tourRouter.route('/')
    .get(getTour)
    .post(PostTour);

tourRouter.route('/:id')
 .get(getTourById)
 .patch(updateTour)
 .delete(DeleteTour);

 module.exports=tourRouter;