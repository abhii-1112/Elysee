const {registerUserService, loginUserService} = require('../services/authServices');
const axios = require('axios')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const addOrderJob = require('../queue/queueService');


const express = require('express')
const app = express()
app.use(express.json())


const registerUser = async (req, res) =>{
    const {name, email, password} = req.body

    try {
        const result = await registerUserService({name, email, password})
        return res.status(201).json({message: 'User created successfully', result})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const loginUser = async (req, res) => {

  const { email, password } = req.body;
  try {
      const result = await loginUserService({ email, password});

      //generate jwt token
      const token = jwt.sign(
        { id: result._id, email: result.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )
      
      return res.status(200).json({message: "Login successful", token, user: result});
    
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  const makeOrder = async (req, res) => {
    const { userId, items, totalAmount } = req.body;
    try {
      await addOrderJob({ userId, items, totalAmount });
      return res.status(200).json({ message: 'Order job added to queue' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

module.exports = {registerUser, loginUser, makeOrder}