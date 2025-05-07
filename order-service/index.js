const express = require('express')
const mongoose = require('mongoose')
const orderRoutes = require('./routes/orderRoutes')
const connectDB = require('./config/db')

const app = express()


connectDB()


app.use(express.json())

app.get('/', (req, res)=> {
    res.send('Hello World!')
})

app.use('/api/order', orderRoutes)

app.listen(5002, ()=>{
    console.log('Server running on port 5002')
})