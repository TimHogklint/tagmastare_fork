const { Mongoose } = require("mongoose");

db.registerModel({
  model: 'Ticket',
  collection: 'tickets',
  apiRoute: 'tickets',
  readOnly: false,
  schemaProperties: {
    bookingId: { type: Mongoose.Schema.Types.ObjectId, ref: 'TrainRoute', required: true },
    trainNumber: { type: Mongoose.Schema.Types.ObjectId, ref: 'TrainRoutes', required: true },
    route: { type: Mongoose.Schema.Types.ObjectId, ref: 'TrainRoutes', required: true },
    departureTime: { type: Date, required: true },
    departureStation: { type: Mongoose.Schema.Types.ObjectId, ref: 'Stations', required: true },
    arrivalStation: { type: Mongoose.Schema.Types.ObjectId, ref: 'Stations', required: true },
    ticketPrice: { type: Number, required: true }

  },
  addHooks(schema) { }
}) 