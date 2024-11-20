const express=require('express')
const Router=express()
const loginmodel=require('../model/userlogin')
const usermodel=require('../model/userregister')
const getCoordinatesOpenCage = async (location) => {
    const apiKey = '13e02a29ce6e4150999d2be00145ce3c';
    const endpoint = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        if (data.results.length > 0) {
            const latitude = data.results[0].geometry.lat;
            const longitude = data.results[0].geometry.lng;
            return {latitude,longitude}
        } else {
            console.log('No results found');
        }
    } catch (error) {
        console.log('Error fetching coordinates:', error);
    }
};
// Example usage
const login = async (user) => {
    const { username, email, phone, start, end, password, busno } = user
    const {latitude,longitude}=await getCoordinatesOpenCage(start)
    
    const userlogin = await loginmodel.create({
        username,
        email,
        phone,
        start,
        end,
        password,
        busno,
        latitude,
        longitude
    })
    return userlogin
}
Router.post('/login-user', async (req, res) => {
    try {
        const { username } = req.body
        const user = await usermodel.findOne({
            username: username
        })
        const userlogin=await login(user)
        res.status(200).json({ userlogin, message: "Success" })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: "Failed" })
    }
})
// Route to fetch all users
Router.get('/login-user', async (req, res) => {
    try {
        const users = await loginmodel.find({}, {start:1,phone:1,busno:1,end:1, latitude: 1, longitude: 1 });
         // Fetch all documents
        // Log the data to the console
        res.status(200).json(users); // Send data as JSON response
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
Router.post('/login-coord',async (req,res)=>{
    try{
        const {username}=req.body
        const user=await loginmodel.findOne({
            username:username
        })
        const{busno,latitude,longitude}=user
        res.status(200).json({busno,latitude,longitude,message:"Success"})
    }
    catch(error){
        res.status(400).json({message:"Failed"})
    }
})

Router.post('/update-coord',async (req,res)=>{
    try {
        const {busno,latitude,longitude}=req.body
        const updated=await loginmodel.updateOne({
            busno:busno
        },{
            latitude:latitude,
            longitude:longitude
        })
        
        
        res.status(200).send("Updated")
    } catch (error) {
        res.status(400).send("Not updated")
    }
})

module.exports=Router