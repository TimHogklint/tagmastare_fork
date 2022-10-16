const Mongoose = require("mongoose");
const db = require('../ModelHandler');

db.registerModel({
  model: 'Customer',
  collection: 'customers',
  apiRoute: 'customers',
  readOnly: false,
  schemaProperties: {
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    telephoneNumber: { type: String, required: true },
    password: {type: String, required: true}
  },
  addHooks(schema) { }
}) 