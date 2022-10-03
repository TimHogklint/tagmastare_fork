const Mongoose = require("mongoose");

db.registerModel({
  model: 'Cart',
  collection: 'cart',
  apiRoute: 'cart',
  readOnly: false,
  schemaProperties: {
    cartType: { type: Number, required: true },
    trainId: { type: Mongoose.SchemaTypes.ObjectId },
    AnimalsAllowed: { type: Boolean, required: true }
  },
  addHooks(schema) { }
}) 