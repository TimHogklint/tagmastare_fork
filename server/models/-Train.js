const { Mongoose } = require("mongoose");

db.registerModel({
  model: 'Train',
  collection: 'train',
  apiRoute: 'train',
  readOnly: false,
  schemaProperties: {
    trainNumber: { type: Number, required: true },
  },
  addHooks(schema) { }
}) 