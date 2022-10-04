db.registerModel({
  model: 'BookingsPerCustomer',
  collection: 'customers',
  apiRoute: 'bookingsPerCustomer',
  readOnly: true,
  schemaPropertiesFrom: 'Customer',
  addHooks(schema) {
    schema.virtual('booking', {
      ref: 'Booking',
      localField: '_id',
      foreignField: 'customer'
    });
    schema.pre('find', function () {
      this.populate('booking', { __v: 0 });
    });
  }
});