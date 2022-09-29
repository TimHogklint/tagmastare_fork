const Mongoose  = require("mongoose");



db.registerModel({
  model: 'Seat',
  collection: 'seat',
  apiRoute: 'seat',
  readOnly: false,
  schemaProperties: {
    seatNumber: { type: Number, required: true },
    disabilitySeat: { type: Boolean, required: true },
    userID: { type: Mongoose.SchemaTypes.ObjectId, ref: 'cart', required: true }
  },
  addHooks(schema) { }
}) 