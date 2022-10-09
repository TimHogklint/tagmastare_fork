const express = require('express')
const router = express.Router()



router.post('/login', loginUser)

//router.post('/login', () => {})



const loginUser = async (req, res) => {
  res.json({mssg: 'login user'})
}



module.exports = router
