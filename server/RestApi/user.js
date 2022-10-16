const express = require('express')
const router = express.Router()
const User = require('../models/-User')
const jwt = require ('jsonwebtoken')


/* const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  
  try {
    const user = await User.login(email, password)

    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch(error) {
    res.status(400).json({error: error.message})
  }
}
 */
const signupUser = async (req, res) => {
  const { customerName, email, phone, password } = req.body
  
  try {
    const user = await User.signup(customerName, email, phone, password)

    //const token = createToken(user._id)
    res.status(200).json({email,token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


//router.post('/login', loginUser)
router.post('/users', signupUser)


