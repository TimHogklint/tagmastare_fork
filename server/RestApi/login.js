const express = require('express')
const app = express()


const Customer = mongoose.model('CustomerInfo')
app.post('/customer', async (req, res) => {
  const [customerName, email, phoneNumber, password] = req.body

  const encryptedPassword = await bcrypt.hash(password, 10)

  try {
    const oldCustomer = await Customer.findOne({ email })
    
    if (oldCustomer) {
      return res.json({error:'User exists'})
    }

    await Customer.create({
      customerName,
      email,
      phoneNumber,
      password:encryptedPassword,
    })
    res.send({status: 'ok'})
  } catch (error) {
    res.send({status: 'error'})
  }
})

app.post('/login-cutomer', async (req, res) => {

  const [email, password] = req.body

  const Customer = await Customer.findOne({ email })
    if (!Customer) {
      return res.json({error:'User not found'})
    }
})