const express=require("express")
const app=express()
const dotenv=require('dotenv')
const router=require('./routes/user.routes')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const dbconnect = require('./connections/moongose')
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
dotenv.config()
dbconnect()


app.use(router)
app.listen(3000,()=>{
    console.log("App is listening")
})