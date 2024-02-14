const user=require('../models/userModel');

//for userSign up
exports.signup=async(req,res,next)=>{
    try {
        const userdata=await user.create(req.body);
        res.status(201).json({
            message:"Sign-up Successfully",
            data:{
                userdata
            }
        })
    } catch (error) {
            res.status(404).json({
                message:"fail to Sign-up",
                data:{},
                error:error
            })
        }
    }
