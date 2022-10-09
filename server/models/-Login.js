const Mongoose = require("mongoose");


db.registerModel({
  model: 'Login',
  collection: 'login',
  apiRoute: 'login',
  readOnly: false,
  schemaProperties: {
    email: { type: String, required: true, unique: true },
    passWord: { type: String, required: true },
    //userID: { type: Mongoose.SchemaTypes.ObjectId, ref: 'email', required: true }
  },
  addHooks(schema) { }
}) 