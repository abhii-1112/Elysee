const { Worker } = require('bullmq');
const { makeOrderService } = require('../service/authService');
const mongoose = require('mongoose')

const connectDB = async ()=> {
    const uri = "mongodb+srv://abhishektripathi1112:3faZYKthb5YaWUun@cluster0.lkfn6ty.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0"
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
