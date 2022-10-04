const Mongoose = require("mongoose");

db.registerModel({
  model: 'TimeTable',
  collection: 'timeTable',
  apiRoute: 'timeTable',
  readOnly: false,
  schemaProperties: {
    startHour: { type: Number, required: true },
    startMinute: { type: Number, required: true },
    runsWeekends: { type: Boolean, required: true },
    date: { type: Date, required: true },
    routeId: { type: Mongoose.SchemaTypes.ObjectId, ref: 'TrainRoute', required: true }
  },
  addHooks(schema) { }
}) 