const fs = require('fs')
const path = require('path')
const db = require('../server/ModelHandler')
const mongoose = require('mongoose')

module.exports = class Seeder {
  static async seed() {
    await db.connect()
    console.log('\n\nSEEDING DB\n' + '-'.repeat(60) + '\n')
    await this.insertData()
    console.log('\n\nAll done!\n');
    process.exit();
  }

  static async insertData() {
    let allCustomers = []
    let data = this.readJsonFiles('./', 'data')
    for (let [route, rows] of data) {

      // remove file path parts and only keep routename from filename
      route = route.split("\\").join('/').split('/').pop();

      // every route/filename starting with seat - change route to seat
      let orgRoute = route;
      route = route.indexOf('seat') === 0 ? 'seat' : route;
      orgRoute !== route && console.log('Changed from ' + orgRoute + " -> " + route);


      let Model = db.modelsByApiRoute[route]?._model;

      if (!Model) {
        // throw (new Error(`Model for collection ${route} not found.`));
        console.warn('CAN NOT FIND MODEL MATCHING ROUTE ' + route);
        continue;
      }

      for (let row of rows) {
        let instance = new Model(row);
        await instance.save();
      }

      console.log(`Inserted data in the ${route} collection.`);
    }


  }
  static readJsonFiles(...pathParts) {
    pathParts.unshift(__dirname);
    return fs.readdirSync(path.join(...pathParts))
      .filter(x => x.slice(-5) === '.json')
      .map(x => path.join(...pathParts, x))
      .map(x => [x, fs.readFileSync(x, 'utf-8')])
      .map(x => [
        x[0].slice(x[0].lastIndexOf('-') + 1, -5),
        JSON.parse(x[1], null, '  ')]);
  }
}