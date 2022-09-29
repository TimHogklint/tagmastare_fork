const { Mongoose } = require("mongoose");

db.registerModel({
  model: 'Booking',
  collection: 'booking',
  apiRoute: 'booking',
  readOnly: false,
  schemaProperties: {
    ticketAmount: { type: Number, required: true },
    routeId: { type: Mongoose.Schema.Types.ObjectId, ref: 'TrainRoute', required: true },
    totalPrice: { type: Number, required: true },
    customer: { type: Mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  },
  addHooks(schema) { }
}) 