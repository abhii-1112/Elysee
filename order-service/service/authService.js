const Order = require('../model/Orders')

const getOrderService = async () => {
    const orders = await Order.find()
    return orders
}

const makeOrderService = async(userId, items, totalAmount) => {
    const newOrder = new Order({userId, items, totalAmount})
    await newOrder.save()
    return newOrder.toObject();
}

module.exports = {getOrderService, makeOrderService}