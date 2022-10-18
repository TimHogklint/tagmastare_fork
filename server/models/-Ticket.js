const Mongoose = require("mongoose");
const db = require('../ModelHandler')

db.registerModel({
  model: 'Ticket',
  collection: 'tickets',
  apiRoute: 'tickets',
  readOnly: false,
  schemaProperties: {
    bookingId: { type: Mongoose.SchemaTypes.ObjectId, ref: 'TrainRoute', required: true },
    trainNumber: { type: Mongoose.SchemaTypes.ObjectId, ref: 'TrainRoutes', required: true },
    route: { type: Mongoose.SchemaTypes.ObjectId, ref: 'TrainRoutes', required: true },
    departureTime: { type: Date, required: true },
    departureStation: { type: Mongoose.SchemaTypes.ObjectId, ref: 'Stations', required: true },
    arrivalStation: { type: Mongoose.SchemaTypes.ObjectId, ref: 'Stations', required: true },
    ticketPrice: { type: Number, required: true }

  },
  addHooks(schema) { }
}) 