import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlusMinus from "../components/PlusMins";



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

  function onClickDepCard() {
    console.log("Clicked departure card")
  }

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
              placeholder="Från"
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
              placeholder="Till"
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
              <div className="travelers">
                Vuxen
                <PlusMinus traveler="Vuxen" /> 
              </div>
              <div className="travelers">
                Barn/Ungdom
                <PlusMinus traveler="Bu" />
                
              </div>
              <div className="travelers">
                Student
                <PlusMinus traveler="Student" />
                
              </div>
              <div className="travelers">
                Pensionär <PlusMinus traveler="Pensioner" />
                
              </div>
            </div>
            
             {/*<div className="ticketbuttons">
               
              <div className="ticketbutton vuxen"><button className="plusbutton">+</button>0<button className="minusbutton">-</button></div>
              <div className="ticketbutton bu"><button className="plusbutton">+</button>0<button className="minusbutton">-</button></div>
              <div className="ticketbutton student"><button className="plusbutton">+</button>0<button className="minusbutton">-</button></div>
              <div className="ticketbutton pensioner"><button className="plusbutton">+</button>0<button className="minusbutton">-</button></div>
            </div>*/}
          </div>
        </div>
      </div>
      <div className="button">
        <button className="srbutton">Sök Resa</button>
      </div>

      {/* Hej patrik , inför sprint review så lägger jag till en länk till payment sidan här 
        Jag antar att vi kommer slussas är ifrån efter rutt funnits. Tim  */}
      <Link className="temp-pay-link" to="/payment">Temp goto payment</Link>


  {/* Depature cards , what contains the departure elements*/}
  <div style={{ display: "block", flexDirection: "column"}}>
       <h3 style={{color: "black"}}>Avgångar</h3>

        <div className="departure-card" onClick={() => onClickDepCard()} style={{ display: 'block' ,  justifyContent: 'center' ,alignItems: 'center', cursor: 'pointer', outline: "dashed 1px black", borderRadius:"1px" , marginLeft: "150px",  marginRight: "150px"}}>
        <h3>Från : {from} - Till : {to}</h3>
        <h3>Tid : 13:00 Söndag Datum</h3>
        <h3>Byten : {route.length-1}</h3>

        {route.map(item => 
        {
          let stations = new Array();

          item.station.forEach(element => {
            stations.push(element['stationName'] + ",");
          });

          return (<>
            <h3>Via {item['routeName']}</h3>
            {/* <h3 className="departure-stations">Path : {stations}</h3> */}
            </>
          )
        })
        }

    </div>
      </div>

      {/* Debug area */}
      {/* <div style={{ display: "flex", flexDirection: "column" }}>
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

      </div> */}

      
    </div>
  )
}