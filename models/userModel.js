const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    photo:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    passwordConfirm:{
        type:String,
        required:true,
        validate:{
            validator:function(val){
                return val===this.password;
            },
            message:'password are not same'
        }
    }
});
//validate pasword or confirmpasword is same using custome validator
//encrpt the password simple password not good to save in db in pre save hook or trigger we menupulate the data .
userSchema.pre('save',async function(next){
    //work on current data thats why we use this.this run only when password is modified-
    if(!this.isModified('password')) return next(); //password is not modified ,isModified mongoose method-
    //hashing the password npm i bcrypt 
    this.password=await bcrypt.hash(this.password,12);
    this.passwordConfirm=undefined//its dosent need any more its check only curentpass=confirpass
    next();
});
const user=mongoose.model('user',userSchema);
module.exports=user;