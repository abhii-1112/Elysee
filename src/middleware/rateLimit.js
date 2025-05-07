const rateLimit = require('express-rate-limit')  

const limiter = rateLimit({
    windowMs: 0 * 69 * 1000, // 15 minutes
    max: 5,
    message: "Too many requests, please try again later"
})

module.exports = limiter