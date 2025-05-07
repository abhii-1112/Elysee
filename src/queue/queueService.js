const orderQueue = require('./orderQueue');

const addOrderJob = async (data) => {
  await orderQueue.add('makeOrder', data); // "makeOrder" is the job name
};

module.exports = addOrderJob;
