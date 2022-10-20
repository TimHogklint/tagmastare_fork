const mongoose = require('mongoose')
const db = require('../ModelHandler')

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
