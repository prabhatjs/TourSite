const mongoose=require('mongoose');
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A tour must have a name'],
        unique:true
    },
    duration:{
        type:Number,
        required:[true,'A tour must have a duration']
    },
    maxGroupSize:{
        type:Number,
        required:true
    },
    difficulty:{
        type:String,
        required:[true,'A tour must have a difficulty']
    },
    ratingsAverage:{
        type:Number,
        default:4.5
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
    price:{
    type:Number,
    required:[true,'A tour must have a price']
    },
    priceDiscoutn:{
        type:Number
    },
    summary:{
        type:String,
        trim:true//remove space from front and end
    },
    description:{
        type:String,
        trim:true
    },
    imageCover:{
        type:String,
        required:true
    },
    images:[String],
    startDates: [Date]
},{timestamps:true});

const tour=mongoose.model('Tour',tourSchema);

module.exports=tour;