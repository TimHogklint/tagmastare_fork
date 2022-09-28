const fs = require('fs')
const path = require('path')
const db = require('../server/ModelHandler')
const mongoose = require('mongoose')

module.exports = class Seeder {
  static async seed() {
    await db.connect()
    await mongoose.connection.db.dropDatabase()
    console.log('\n\nSEEDING DB\n' + '-'.repeat(60) + '\n')
    await this.insertData()
    console.log('\n\nAll done!\n');
    process.exit();
  }

  static async insertData() {
    let allCustomers = []
    let data = this.readJsonFiles('./', 'data')
    
    for (let [route] of data) {
      let model = db.modelsByApiRoute[route]._model;
      if (!model) {
        throw (new Error(`Model for collection ${route} not found.`));
      }
      if (route === 'customers') {
        console.log('customers working')
        /* rows.forEach(x =>
          x.customerId = x.customerId === null ? null : allCustomers[x.customerId - 1]); */
      } 
    
      console.log(`Inserted data in the ${route} collection.`);
    }
  }
}