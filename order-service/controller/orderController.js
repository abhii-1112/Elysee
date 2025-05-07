const Order = require('../model/Orders')
const {getOrderService, makeOrderService} = require('../service/authService')

const getOrder = async (req, res) =>{
    try {
        const orders = await getOrderService()
        return res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const makeOrder = async (req, res) => {
    try {
        const {userId, items} = req.body
        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const result = await makeOrderService(userId, items, totalAmount)
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {getOrder, makeOrder}