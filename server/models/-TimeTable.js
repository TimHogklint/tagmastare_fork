const { Mongoose } = require("mongoose");

db.registerModel({
  model: 'TimeTable',
  collection: 'timeTable',
  apiRoute: 'timeTable',
  readOnly: false,
  schemaProperties: {
    startTime: { type: Number, required: true },
    runsWeekends: { type: Boolean, required: true },
    routeId: { type: Mongoose.Schema.Types.ObjectId, ref: 'TrainRoute', required: true }
  },
  addHooks(schema) { }
}) 