const express = require('express')
const Router = express()
const usermodel = require('../model/userregister')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

Router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const userdata = await usermodel.findOne({
            username: username,
        })
        if (!userdata) {
            return res.status(401).json({ message: "Username or Password is incorrect" })
        }
        const isMatch = await bcrypt.compare(password, userdata.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Username or Password is incorrect" })
        }
        const token=jwt.sign({
            userId:userdata._id,
            username:userdata.username,
            email:userdata.email

        },process.env.JWT_SECRET)
        res.cookie('token',token)
        res.status(200).json({ userdata, message: "Success" })

    }
    catch (error) {
        res.status(401).json({ message: "Failed" })
    }
})


Router.post('/register-username',

    async (req, res) => {
        try {
            const { username } = req.body
            const user = await usermodel.findOne({
                username: username
            })
            if (!user) {
                return res.send("true")
            }
            else {
                return res.send("false")
            }

        }
        catch (error) {
            res.status(401).json({ message: "Failed" })
        }
    })
Router.post('/register-email',

    async (req, res) => {
        try {
            const { email } = req.body
            console.log(email)
            const user = await usermodel.findOne({
                email: email
            })
            if (!user) {
                return res.send("true")
            }
            else {
                return res.send("false")
            }


        }
        catch (error) {
            res.status(401).json({ message: "Failed" })
        }
    })
Router.post('/register-phone',

    async (req, res) => {
        try {
            const { phone } = req.body
            console.log(phone)
            const user = await usermodel.findOne({
                phone: phone
            })
            if (!user) {
                return res.send("true")
            }
            else {
                return res.send("false")
            }


        }
        catch (error) {
            res.status(401).json({ message: "Failed" })
        }
    })
Router.post('/register-busno',

    async (req, res) => {
        try {
            const { busno } = req.body
            const user = await usermodel.findOne({
                busno: busno
            })
            if (!user) {
                return res.send("true")
            }
            else {
                return res.send("false")
            }


        }
        catch (error) {
            res.status(401).json({ message: "Failed" })
        }
    })
Router.post('/register', async (req, res) => {
    try {
        const { username, email, phone, start, end, password, busno } = req.body
        const hashpassword = await bcrypt.hash(password, 10)
        const data = await usermodel.create({
            username,
            email,
            phone,
            start,
            end,
            password: hashpassword,
            busno
        })
        
        res.status(200).json({ data, message: "Successful" })
    }
    catch (error) {
        console.error('Error saving to database:', error);
        res.status(401).json({ message: "Failed" });
    }
})
module.exports = Router