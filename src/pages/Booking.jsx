import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Booking() {

  const [locations, setLocations] = useState([]);
  const [locationMatch, setLocationMatch] = useState([]);

  let [route, setRoute] = useState([]);

  // This is quite bad - I basically "recoded" dropdown 
  // component twice here. I just wanna get to the route 
  // display - however I should go back and encapsulate 
  // the dropdown into a component.
  //
  // first dropdown list
  const [from, setFrom] = useState([]);
  // second dropdown list
  const [to, setTo] = useState([]);

  useEffect(() => {
    const loadLocations = async () => {

      fetch("http://localhost:3000/api/getUniqueStations")
        .then((res) => res.json())
        .then((json) => {
          // console.log(json);
          setLocations(json);
        })
    };
    loadLocations();
  }, []);

  const searchFromLocations = (text) => {
    setFrom(text);

    let matches = locations.filter((location) => {
      const regex = new RegExp(`${text}`, "gi");
      // console.log("Autocomplete -> " + location.match(regex));
      return location.match(regex);
    })

    setLocationMatch(matches);
  };

  const searchToLocations = (text) => {
    setTo(text);

    let matches = locations.filter((location) => {
      const regex = new RegExp(`${text}`, "gi");
      // console.log("Autocomplete -> " + location.match(regex));
      return location.match(regex);
    })

    setLocationMatch(matches);
  };

  function handleFromLocation(setName) {
    setFrom(setName);
    updateSearch(setName, to);
  }

  function handleToLocation(setName) {
    setTo(setName);
    updateSearch(from, setName);
  }

  // get routes
  function updateSearch(from, to) {
    console.log("SEARCH -> " + "http://localhost:3000/api/seekRoute/" + from + "+" + to);

    fetch("http://localhost:3000/api/seekRoute/" + from + "+" + to)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setRoute(json);
      })
  }

  // Controls the dropdown menu on search fields; I would like 
  // to encapsulate the dropdown into a component in the future.
  const [dd_from_isOpen, dd_from_setIsOpen] = useState(false);
  const [dd_to_isOpen, dd_to_setIsOpen] = useState(false);

  return (
    <div className="main">
      <div className="navbar">
        <div className="goback">
          <Link className="goback-link" to="/">X Gå tillbaka</Link>
        </div>
      </div>
      <div className="container">
        <div className="content">

          <div className="input">
            <div className="searchText">
              <p>Sök Resa</p>
            </div>


            <input className="searchfield"
              type="search"
              placeholder="Till"
              onChange={(e) => searchFromLocations(e.target.value)}
              onFocus={() => dd_from_setIsOpen(true)}
              onBlur={() => dd_from_setIsOpen(false)}
              value={from}
            ></input>

            <div className="search-form">
              <div className={'dropdown-' + (dd_from_isOpen ? 'open' : 'closed')}>
                {locationMatch.map(location => {
                  return (
                    <a href="#" onMouseDown={() => handleFromLocation(location)} >{location}</a>
                  )
                })}
              </div>
            </div>

            {/* Från search field */}

            <input className="searchfield"
              type="search"
              placeholder="Från"
              onChange={(e) => searchToLocations(e.target.value)}
              onFocus={() => dd_to_setIsOpen(true)}
              onBlur={() => dd_to_setIsOpen(false)}
              value={to}
            ></input>

            <div className="search-form">
              <div className={'dropdown2-' + (dd_to_isOpen ? 'open' : 'closed')}>
                {locationMatch.map(location => {
                  return (
                    <a href="#" onMouseDown={() => handleToLocation(location)}>{location}</a>
                  )
                })}
              </div>
            </div>

            <input className="datefield" type="date"></input>
            + lägg till återresa
          </div>
          <div className="ticketcontainer">
            <div className="ticketamounts">
              <div className="ticket vuxen">
                Vuxen
              </div>
              <div className="ticket bu">
                Barn/Ungdom
              </div>
              <div className="ticket student">
                Student
              </div>
              <div className="ticket pensioner">
                Pensionär
              </div>
            </div>
            <div className="ticketbuttons">
              <div className="ticketbutton vuxen"><button className="plusbutton">+</button>0<button className="minusbutton">-</button></div>
              <div className="ticketbutton bu"><button className="plusbutton">+</button>0<button className="minusbutton">-</button></div>
              <div className="ticketbutton student"><button className="plusbutton">+</button>0<button className="minusbutton">-</button></div>
              <div className="ticketbutton pensioner"><button className="plusbutton">+</button>0<button className="minusbutton">-</button></div>
            </div>
          </div>
        </div>
      </div>
      <div className="button">
        <button className="srbutton">Sök Resa</button>
      </div>

      {/* Hej patrik , inför sprint review så lägger jag till en länk till payment sidan här 
        Jag antar att vi kommer slussas är ifrån efter rutt funnits. Tim  */}
      <Link className="temp-pay-link" to="/payment">Temp goto payment</Link>

      {/* Autocomplete */}

      {/* <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h4>auto-complete candidates</h4>
          {locationMatch.map(location => {
            return (
              // for some reason react will complain about <text> ? 
              // perhaps locationMatch isent full and thats the problem.
              <text>{location}</text>
            )
          })}

        </div>
      </div>
       */}


      <div style={{ display: "flex", flexDirection: "column" }}>
       <h3 style={{color: "red"}}>Debug panel</h3>


        {route.map(item => 
        {
          let stations = new Array();

          item.station.forEach(element => {
            stations.push(element['stationName'] + ",");
          });

          return (<>
            <h3>Route name : {item['routeName']}</h3>
            <h3>Path : {stations}</h3>
            </>
          )
        })
        }

      </div>
    </div>
  )
}