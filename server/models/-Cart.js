const { Mongoose } = require("mongoose");

db.registerModel({
  model: 'Cart',
  collection: 'cart',
  apiRoute: 'cart',
  readOnly: false,
  schemaProperties: {
    cartType: { type: Number, required: true },
    userID: { type: Mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
    AnimalsAllowed: { type: Boolean, required: true }
  },
  addHooks(schema) { }
}) 