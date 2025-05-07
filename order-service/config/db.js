const mongoose = require('mongoose');
require("dotenv").config();
console.log("ENV CHECK:", process.env.MONGO_URI);

const connectDB = async ()=> {
    const uri = process.env.MONGO_URI;
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed', error)
    }
}

module.exports = connectDB;
