
const getAllUsers=(req,res)=>{
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
const updateuser=(req,res)=>{
return res.status(404).json({
   message:"fail",
   error:"Invalid ID",
   data:{}
});
}
const createUser=(req,res)=>{

}

const getUserById=(req,res)=>{

}

const deleteUser=(req,res)=>{

}

module.exports={
    getAllUsers,getUserById,updateuser,createUser,deleteUser
}