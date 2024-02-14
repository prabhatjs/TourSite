const express=require('express');
const {getAllUsers,updateuser,deleteUser,createUser,getUserById}=require('../controller/userController')
const authController=require('../controller/authController')

const userRouter=express.Router();
//get signup controller form this url,authcontroller is middelware
userRouter.post('/signup',authController.signup);
//when we use multiple method of route
userRouter.route('/')
.get(getAllUsers)
.post(createUser);

userRouter.route('/:id')
.get(getUserById)
.patch(updateuser)
.delete(deleteUser);

module.exports=userRouter