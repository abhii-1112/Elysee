const express = require('express')
const router = express.Router()
const {registerUser, loginUser, makeOrder} = require('../controllers/userController')
const authenticateUser = require('../middleware/authMiddleware')
const limiter  = require('../middleware/rateLimit');


router.get('/profile', authenticateUser, (req, res) => {
    res.status(200).json({ message: `Hello, ${req.user.email}` });
  });

router.post('/register', registerUser)

router.post('/login', limiter, loginUser)

router.post('/make-order', makeOrder)

module.exports = router
