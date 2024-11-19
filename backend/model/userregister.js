const mongoose=require('mongoose')

const user=new mongoose.Schema({
    username:{
        type:String,
       required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        
    },
    start:{
        type:String,
        required:true,
    },
    end:{
        type:String,
        required:true,
    },
    password:{
        type:String,
       required:true,
    },
    busno:{
        type:String,
        required:true,
    }
})

const usermodel=mongoose.model('user',user)

module.exports=usermodel