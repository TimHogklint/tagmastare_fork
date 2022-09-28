//import modules
const path = require('path')
const express = require("express")
const RestApi = require('./RestApi')

module.exports = class Server {
  app = express();
  port = 4000;

  constructor () {
    this.start()
  }

  start() {
    this.app.use(express.json())
    new RestApi(this.app)
    this.serveDist()
    let message = `Backend listening on port ${this.port}`
    this.app.listen(this.port, () => console.log(message))
  }

  serveDist() {
    this.app.use(express.static(path.join(__dirname, '../', 'dist')));
  }

}