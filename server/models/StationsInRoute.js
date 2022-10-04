db.registerModel({
    model: 'StationsInRoute',
    collection: 'trainRoute',
    apiRoute: 'stationsInRoute',
    readOnly: true,
    schemaPropertiesFrom: 'TrainRoute',
    addHooks(schema) {
      schema.virtual('station', {
        ref: 'Station',
        localField: '_id',
        foreignField: 'routeId'
      });
      schema.pre('find', function () {
        this.populate('station', { __v: 0 });
      });
    }
  });