const mongoose = require('mongoose')
const db = require('../ModelHandler')
/* const bcrypt = require('bcrypt')
const validator = require('validator') */



const UserSchema = db.registerModel({
  model: 'User',
  collection: 'users',
  apiRoute: 'users',
  readOnly: false,
  schemaProperties: {
    customerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: {type: String, required: true}
  },
  addHooks(schema) { }
}) 

/* UserSchema.statics.signup = async function (customerName, email, phone, password) {
  if (!customerName || !email || !phone || !password ) {
    throw Error('Alla fälten måste fyllas i')
  }
  if (!validator.isEmail(email)) {
    throw Error ('Email är inte giltig')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error ('Lösenord är inte stark')
  }

  const exists = await this.findOne({ email })
  if (exists) {
    throw Error ('Email används redan')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ customerName, email, phone, password: hash })
  return user
}

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('Alla fälten måste vara ifyllda')
  }
  
  const user = await this.fintOne({email})
  if (!user) {
    throw Error ('Fel mejladress')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error ('Fel lösenord')
  }
  return user
}

module.exports = db.model('User', UserSchema) */