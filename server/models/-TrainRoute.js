const  Mongoose  = require("mongoose");

db.registerModel({
  model: 'TrainRoute',
  collection: 'trainRoute',
  apiRoute: 'trainRoute',
  readOnly: false,
  schemaProperties: {
    routeName: { type: String, required: true },
    train: { type: Mongoose.SchemaTypes.ObjectId, ref: 'Train', required: true }
  },
  addHooks(schema) { }
}) 