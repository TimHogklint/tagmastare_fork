const { Mongoose } = require("mongoose");

db.registerModel({
  model: 'Station',
  collection: 'station',
  apiRoute: 'station',
  readOnly: false,
  schemaProperties: {
    stationName: { type: String, required: true },
    routeId: { type: Mongoose.Schema.Types.ObjectId, ref: 'TrainRoute', required: true },
    arrivalOffset: { type: Number, required: true },
    departureOffset: { type: Number, required: true },
  },
  addHooks(schema) { }
}) 