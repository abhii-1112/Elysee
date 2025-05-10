const express = require('express')
const mongoose = require('mongoose')
const orderRoutes = require('./routes/orderRoutes')
const connectDB = require('./config/db')
require("dotenv").config();


const app = express()


connectDB()


app.use(express.json())

app.get('/', (req, res)=> {
    res.send('Hello World!')
})

app.use('/api/order', orderRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})