db.registerModel({
  model: 'Ticket',
  collection: 'tickets',
  apiRoute: 'tickets',
  readOnly: false,
  schemaProperties: {
    bookingID: {},
    
  },
  addHooks(schema) { }
}) 