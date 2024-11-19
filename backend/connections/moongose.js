const mongoose=require('mongoose')

function connect(){
    mongoose.connect(process.env.MONGO_URI).then(
        console.log("Connected")
    )
}

module.exports=connect