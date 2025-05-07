const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
          name: String,
          price: Number,
          quantity: Number,
        },
      ],
      totalAmount: { type: Number, required: true },
      status: { type: String, default: 'pending' },
      orderDate: { type: Date, default: Date.now },

})

module.exports = mongoose.model('Order', orderSchema)