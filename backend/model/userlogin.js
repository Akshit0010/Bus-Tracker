const mongoose=require('mongoose')

const userlogin=new mongoose.Schema({
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
    },
    latitude:{
        type:Number,
        required:true
    },
    longitude:{
        type:Number,
        required:true
    }
})

const login=mongoose.model('userlogin',userlogin)

module.exports=login