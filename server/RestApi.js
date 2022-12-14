const {
  json
} = require('express');
const {
  default: mongoose
} = require('mongoose');
const {
  NavItem
} = require('react-bootstrap');
const db = require('./ModelHandler');
const Customer = require('../server/models/-Customer')




module.exports = class RestApi {

  constructor(expressApp) {
    this.app = expressApp;
    this.handleRequestBodyJsonErrors();
    this.createRoutes();
  }

  handleRequestBodyJsonErrors() {
    this.app.use((error, req, res, next) =>
      error instanceof SyntaxError ?
      res.status(400) && res.json({
        error
      }) :
      next()
    );
  }

  async createRoutes() {
    await db.connect();
    this.createTablesAndViewsRoute();
    this.getBookingByDate();

    this.getUniqueStations();
    this.seekRoute();

    this.getTimeTableByRouteId();

    this.createRouter();
  }

  getBookingByDate() {
    this.app.get('/api/getBookingByDate/:id', async (req, res) => {
      let model = await db.modelsByApiRoute['timeTable'];
      let result = await model._model.find({
        date: (req.params.id)
      }, {
        __v: 0
      }).lean();
      res.json(result)

    });
  }

  createTablesAndViewsRoute() {
    this.app.get('/api/tablesAndViews', async (req, res) => {
      res.json("testing")
    });
  }

  // Similar to above but looks for the routeId instead - used to populate departures
  // when user is searching for from/to on the booking page.
  getTimeTableByRouteId() {
    this.app.get('/api/getTimeTableByRouteId/:id', async (req, res) => {
      let model = await db.modelsByApiRoute['timeTable'];
      let result = await model._model.find({
        routeId: (req.params.id)
      }, {
        __v: 0
      }).lean();
      res.json(result)

    });
  }

  createTablesAndViewsRoute() {
    this.app.get('/api/tablesAndViews', async (req, res) => {
      res.json("testing")
    });
  }

  getTimeTablesByRoute()
  {
    this.app.get('/api/timeTableByRouteId/:id', async (req, res) => {
      try {
        res.json("I ran w/ " +  req.params.id);
      } catch (err) {
        res.json(err);
      }
    });
  }

  createRouter() {
    let run = (req, res) => this.route(req, res);
    this.app.all('/api/:route', run);
    this.app.all('/api/:route/:id', run);
  }

  getUniqueStations() {
    this.app.get('/api/getUniqueStations', async (req, res) => {
      try {

        // Using the view to connect stations to routes via ID.
        let model = await db.modelsByApiRoute['station'];

        // Get all train routes with related stations as childern in stations.
        let data = await model._model.find({}, {
          _id: 0,
          stationName: 1
        });

        // Format all stations to more workable state 
        // ie remove its key and id.
        const unsortedNames = [];
        for (let i = 0; i < Object.values(data).length; i++) {
          let nameStat = data[i]['stationName'];
          // console.log(nameStat);
          unsortedNames.push(nameStat);
        }

        // console.log(unsortedNames);

        const names = unsortedNames;
        const count = names =>
          names.reduce((result, value) => ({
            ...result,
            [value]: (result[value] || 0) + 1
          }), {}); // don't forget to initialize the accumulator
        const duplicates = dict =>
          Object.keys(dict).filter((a) => dict[a] > 1);


        res.json(duplicates(count(names)));
      } catch (err) {
        res.json(err);
      }
    });
  }

  seekRoute() {
    this.app.get('/api/seekRoute/:id', async (req, res) => {

      // example "Göteborg+Trelleborg"
      // Handle spaces ? "Stockholm C"
      const str = req.params.id;
      const splitArr = str.split("+");

      // if splitArr lenght > 1 : error , bad format.
      const stationA = splitArr[0];
      const stationB = splitArr[1];


      // The end result of query; initially "None".
      let searchResult = "None";

      // Case #1 - Get routes that contain both stations on single 
      try {

        // Using the view to connect stations to routes via ID.
        let model = await db.modelsByApiRoute['stationsInRoute'];

        // Get all train routes with related stations as childern in stations.
        let result = await model._model.find({
          __v: 0
        }).lean();

        let route = this.seek(result, stationA, stationB);

        res.json(route);
      } catch (err) {
        res.json("{message : err}");
      }
    });
  }
  
  // Ended up going with a quite naive method as I had far too many
  // problems with sorting my json data. /Tim 
  //
  // "Visited" stations would have been neat todo. 
  // I might have arranged unique stations with relation to routes as children data instead. 
  // oh well. 
  seek(allRoutes, origin, destination) {

    let originList = this.findRoutesWithLocation(allRoutes, origin);
    let destList = this.findRoutesWithLocation(allRoutes, destination);

    console.log("---")

    for (let y = 0; y < originList.length; y++)
      console.log("Origin list #" + y + " - Route name :" + originList[y]['routeName']);

    for (let x = 0; x < destList.length; x++)
      console.log("Destination list #" + x + " - Route name :" + destList[x]['routeName']);


    let bestRoute = new Array();

    // make sure were not already on destination route(s)
    for (let s = 0; s < originList.length; s++) {
      let stations = originList[s].station;

      let startIndex = this.getStationIndex(stations, origin);
      let nStations = new Array();

      for (let d = startIndex; d < stations.length; d++) 
      {
        let currStation = stations[d]['stationName'];

        if (currStation == destination) {

          // I only do this so stations before our origins are not in the array.
          nStations.push(stations[d]);
          originList[s].station = nStations;

          bestRoute.push(originList[s]);

          break;
        }
        else
        {
          nStations.push(stations[d]);
        }
      }
    }

    // we found destination in origin(s) - pick route with fewest stations
    if (bestRoute.length > 0) {
      console.log("Lists to inspect " + bestRoute.length);

      let shortestPath = this.getSmallestArray(bestRoute);
      // Why is station before origin left ? 
      console.log("Shortest list " + shortestPath['routeName'] + " # " + shortestPath.station.length + " stations.");
      //console.log(shortestPath.station);

      return bestRoute;
    } 
    else 
    {
      // clean
      bestRoute = new Array();
      console.log("ELSE SEARCH");

      // The way I see it I have to search both 
      // origin and destination list for a shared station. 

      for (let s = 0; s < originList.length; s++) 
      {
        let originStations = originList[s].station;


        for(let x = 0; x < destList.length; x++)
        {
          let destStations = originList[s].station;

          // both those lists.

          for(let a = 0; a < originStations.length; a++)
          {
            let originStation = originStations[a]['stationName'];

            for(let b = 0; b < destStations.length; b++)
            {
              let destStation = destStations[b]['stationName'];

              if(originStation == destStation)
              {
                  bestRoute.push(originList[s]);
                  bestRoute.push(destList[x]);

                  console.log("I finished");
                  return bestRoute;
              }
            }
          }
        }
      }
   

      console.log("something went wrong");
      return null;
    }

    // This area is unreachable.
    console.log("Something terrible happend.");
  }

  findPath(orgList, destList, origin,destination) {


    let stationAList = orgList.station;
    let stationBList = destList.station;

    let startIndex = this.getStationIndex(stationAList, origin);

    let sharedStation = null;

    for (let y = startIndex; y < stationAList.length; y++) 
    {
      let currStation = stationAList[y];

      for (let x = 0; x < stationBList.length; x++) {

        let destStation = stationBList[x];

        // find shared station.
        if (currStation['stationName'] === destStation['stationName']) 
        {
          sharedStation = currStation['stationName'];
          break;
        }
      }
    }

    if(sharedStation != null)
    {
      console.log("Shared station found " + sharedStation);
      // what we know as of this point
      // - origin , destination 
      // - shared station between origin,destination 

      let originIndex = this.getStationIndex(stationAList,origin);
      // console.log("Origin index : " + originIndex);

      let swapIndexA = this.getStationIndex(stationAList,sharedStation);
      // console.log("SwapA index : " + swapIndexA + " at " + sharedStation + " in route " + orgList['routeName']);

      let routeAStations = orgList.station.slice(originIndex,swapIndexA+1);


      let entryPoint = this.getStationIndex(stationBList,sharedStation);
      //  console.log("Entered destination route at " + entryPoint + " index in route " + destList['routeName']);

      let destinationIndex = this.getStationIndex(stationBList,destination);
      // console.log("Destination located at " + destinationIndex + " inside route " + destList['routeName']);

      let routeBStations = destList.station.slice(entryPoint,destinationIndex+1);
      

      // just for safety we make sure path makes sense in terms of order.
      // ie enter after destination yet expect train to drive backwards to our
      // target.
      if(originIndex < swapIndexA && entryPoint < destinationIndex)
      {
        let packedRoute = new Array();
        packedRoute.push(orgList);
        packedRoute[0].station  = routeAStations;
  
        // Comes up enmpty :S 
        packedRoute.push(destList);
        packedRoute[1].station = routeBStations;
  
        return packedRoute;
      }
      else 
        return null;
    }
    else
    {
    // If it get to here - it could not find a shared station and should return null
   // console.log("No match found");
    return null;
    }

  }

  findRoutesWithLocation(allRoutes, stationToFind) {
    // Since we can have multiple results we save 
    // them in an array ahead of sorting them.
    let hits = new Array();

    for (let y = 0; y < Object.values(allRoutes).length; y++) {
      let stationsRoute = allRoutes[y];

      // Abit confusing part here 'station' is actually the list 
      // of all stations under this trainRoute.
      for (let x = 0; x < stationsRoute['station'].length; x++) {

        let currentStation = allRoutes[y].station[x]['stationName'];
        // console.log(currentStation);

        if (currentStation === stationToFind) {
          //searchResult  =  ("Found " + stationToFind + " in route " + allRoutes[y].routeName);
          hits.push(allRoutes[y]);
        }
      }
    }

    return hits;
  }
  
  getStationIndex(list, location) {

    var data = list;
    var index = -1;
    var val = location;

    // fetches our starting point
    var filteredObj = data.find(function (item, i) {
      if (item['stationName'] === val) {
        index = i;
        return i;
      }
    });

    return index;
  }

  getSmallestArray(list) {
    let lowestLenghtIndex = 0;
    let lowestLenght = 99;

    for (let l = 0; l < list.length; l++) {


      if (list[l].station.length < lowestLenght) {

        lowestLenghtIndex = l;
        lowestLenght = list[l].station.length;
      }

      //console.log("Route : " + list[l]['routeName'] + " " + lowestLenght);
    }

    return list[lowestLenghtIndex];
  }

  async route(req, res) {
    let {
      route,
      id
    } = req.params;
    let method = req.method.toLowerCase();
    let model = await db.modelsByApiRoute[route];
    if (!model) {
      res.status(404);
      res.json({
        error: 'No such route'
      });
    } else {
      this[method](model, id, req, res);
    }
  }

  // async get(m, id, req, res) {
  //   id = !isNaN(+id) ? id : null;

  //   let result = await m._model
  //     .find({}, { __v: 0 }).lean();
  //   res.json({message : result});
  // }

  async get(m, id, req, res) {
    if (!req.params.id) {
      id = !isNaN(+id) ? id : null;

      let result = await m._model
        .find({}, {
          __v: 0
        }).lean();
      // ? why unneccesary encapsulaton of result in an
      // object as message property

      // res.json({ message : result});

      res.json(result);
    } else {
      try {
        const found = await m._model.find({
          _id: (req.params.id)
        }, {
          __v: 0
        }).lean();
        if (found != null) {
          res.json(found);
        } else
          res.status(404).json({
            message: err
          })
      } catch (err) {
        res.status(500).json({
          messsage: err
        });
      }
    }
  }

  async post(m, id, req, res) {
    // not written yet, but should be quite simple to write
    let newPost = await m._model(req.body)
    let result = await newPost.save()
    res.json(result);
  }

  async put() {
    // not written yet, but should be quite simple to write
  }

  async delete(m, id, req, res) {
    if (!req.params.id) {
      res.json("You need to enter an Id of the object you want to delete")
    } else {
      let model = await db.modelsByApiRoute['tickets'];
      if (m === model) {
        let query = await m._model.find({
          _id: (req.params.id)
        }).select('_id');
        let ticketToRemove = await m._model.findByIdAndRemove({
          _id: (req.params.id)
        });

        res.json("Du har avbokat biljetten med nummer: " + query)
      } else {
        let objectToRemove = await m._model.findByIdAndRemove({
          _id: (req.params.id)
        });
        if (!objectToRemove) {
          res.json("That object does not exist in the database")
        } else {
          res.json("You have removed " + objectToRemove)
        }
      }
    }
  }


  parseUrlQueryParams(url) {
    let operators = ['!=', '>=', '<=', '=', '>', '<', '≈'];
    let params = url.split('?', 2)[1];
    let keyVal = {};
    let ors = [];
    if (!params) {
      return [keyVal, ors]
    };
    for (let part of params.split('&')) {
      part = decodeURI(part);
      let operator = '';
      for (let op of operators) {
        if (part.includes(op)) {
          operator = op;
          break;
        }
      }
      if (!operator) {
        continue;
      }
      let [key, val] = part.split(operator);
      let or = key[0] === '|';
      or && (key = key.slice(1));
      ors[key] = or;
      val = isNaN(+val) ? val : +val;
      if (operator !== '=') {
        val = {
          [operator]: val
        }
      };
      keyVal[key] = val;
    }
    return [keyVal, ors];
  }

  whereFromParams(params, ors) {
    // STILL AS IN SQL VERSION
    // NEEDS REWRITE SO THAT WE BUILD A MONGO QUERY OBJECT
    let where = [];
    let whereVals = [];
    for (let [key, val] of Object.entries(params)) {
      let isObj = val && typeof val === 'object';
      let operator = isObj ? Object.keys(val)[0] : '=';
      val = isObj ? Object.values(val)[0] : val;
      operator = '≈' ? 'REGEXP' : '';
      where.push((ors[key] ? ' OR  ' : ' AND ') + key + ' ' + operator + ' ?');
      whereVals.push(val);
    }
    where = where.join('');
    return [where.slice(5), whereVals];
  }

}