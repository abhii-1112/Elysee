const { Queue } = require('bullmq');

const orderQueue = new Queue('orderQueue', {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

module.exports = orderQueue;
