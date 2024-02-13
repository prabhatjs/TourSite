const express=require('express');
const {getTour,getTourById,PostTour,DeleteTour,updateTour,topcheapTour,mostHigestPrice,getTourStatus,BusyMonth}=require('../controller/tourController')

const tourRouter=express.Router();
//[param middleware,val hold value of id]
    tourRouter.param('id',(req,res,next,val)=>{
        next();
        console.log(val);
    });
    //more route about best tour ,chippest tour,best rating more- or ek middelware function hoga controller me 
    tourRouter.route('/bestchipesttour').get(topcheapTour,getTour);
    tourRouter.route('/pricehighlow').get(mostHigestPrice,getTour);
    tourRouter.route('/aggrigate').get(getTourStatus);
    tourRouter.route('/mostvisitedmonth/:year').get(BusyMonth);
    tourRouter.route('/')
    .get(getTour)
    .post(PostTour); 

tourRouter.route('/:id')
 .get(getTourById)
 .patch(updateTour)
 .delete(DeleteTour);
 module.exports=tourRouter;