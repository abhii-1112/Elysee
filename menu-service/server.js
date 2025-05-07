const express = require('express')
const mongoose = require('mongoose')


require('dotenv').config()
const cors = require('cors')
const menuRoutes = require('./routes/menuRoute')

const app = express()
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use('/api/menu', menuRoutes)

const connectDB = async () => {
    const uri = process.env.MONGO_URI
    try {
        await mongoose.connect(uri)
        console.log('MongoDB connected')
    } catch (error) {
        console.error('MongoDB connection failed', error)
    }
}

connectDB()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(5001, () => {
    console.log('Server is running on port 5001')
})


