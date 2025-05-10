const { Worker } = require('bullmq');
const { makeOrderService } = require('../service/authService');
const mongoose = require('mongoose')
require("dotenv").config()

const connectDB = async ()=> {
    const uri = process.env.MONGO_URI
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed', error)
    }
}


connectDB()

const worker = new Worker('orderQueue', async job => {
  console.log('Processing job:', job.name, job.data);
  if (job.name === 'makeOrder') {
    const { userId, items, totalAmount } = job.data;
    await makeOrderService(userId, items, totalAmount);
  }
}, {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});



worker.on('completed', job => {
  console.log(`Job ${job.id} completed!`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});
