const { Mongoose } = require("mongoose");

db.registerModel({
  model: 'Login',
  collection: 'login',
  apiRoute: 'login',
  readOnly: false,
  schemaProperties: {
    passWord: { type: String, required: true },
    userID: { type: Mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true }
  },
  addHooks(schema) { }
}) 