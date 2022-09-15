const express = require("express")
const router = express.Router()

//import controller
const {getTest} = require('../controllers/test')

//import middelwares

//api routes
router.get('/test', getTest) 

module.exports = router;