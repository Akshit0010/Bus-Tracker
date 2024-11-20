const express=require("express")
const app=express()
const dotenv=require('dotenv')
const router=require('./routes/user.routes')
const maprouter=require('./routes/mappingroutes')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const dbconnect = require('./connections/moongose')
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,              // Allow cookies and credentials
}));
dotenv.config()
dbconnect()


app.use(router)
app.use(maprouter)

app.listen(3000,()=>{
    console.log("App is listening")
})