const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

module.exports = class ModelHandler {
  
  static types = mongoose.Schema.Types
  static modelsByApiRoute = {}
  static modelsByName = {}

  static async connect() {
    global.db = this;
    await mongoose.connect(require('./secrets/dbCredentials.json'))
    this.getAllModels()
  }

  static getAllModels() {
    let modelsPath = path.join(__dirname, 'models')
    fs.readdirSync(modelsPath).sort()
      .filter(x => x.slice(-3) === '.js')
      .map(x => path.join(modelsPath, x))
      .forEach(x => require(x))
    this.finalizeSchemasAndModels()
  }

  static registerModel(settings) {
    this.modelsByApiRoute[settings.apiRoute] = settings
    this.modelsByName[settings.model] = settings
  }

  static finalizeSchemasAndModels() {
    for (let x of Object.values(this.modelsByName)) {
      let { collection } = x;
      let schemaProps = x.schemaProperties
        || this.modelsByName[x.schemaPropertiesFrom].schemaProperties;
      let schema = new mongoose.Schema(schemaProps, { collection });
      x.addHooks && x.addHooks(schema);
      let model = mongoose.model(x.model, schema);
      console.log('Model ' + x.model + ' created');
      x._model = model;
    }
  }
}