const express=require('express');
const {getAllUsers,updateuser,deleteUser,createUser,getUserById}=require('../controller/userController')
const userRouter=express.Router();
userRouter.route('/')
.get(getAllUsers)
.post(createUser);

userRouter.route('/:id')
.get(getUserById)
.patch(updateuser)
.delete(deleteUser);

module.exports=userRouter