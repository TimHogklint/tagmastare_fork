import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Booking() {

  const [locations, setLocations] = useState([]);
  const [locationMatch, setLocationMatch] = useState([]);


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

  const searchLocations = (text) => {
    let matches = locations.filter((location) => {
      const regex = new RegExp(`${text}`, "gi");
      // console.log("Autocomplete -> " + location.match(regex));
      return location.match(regex);
    })

    setLocationMatch(matches);
  };

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
              onChange={(e) => searchLocations(e.target.value)}
              onFocus={() => dd_from_setIsOpen(true)}
              onBlur={() => dd_from_setIsOpen(false)}
            ></input>

            <div className="search-form">
              <div className={'dropdown-' + (dd_from_isOpen ? 'open' : 'closed')}>
                {locationMatch.map(location => {
                  return (
                    <a href="#">{location}</a>
                  )
                })}
              </div>
            </div>

            {/* Från search field */}

            <input className="searchfield"
              type="search"
              placeholder="Från"
              onChange={(e) => searchLocations(e.target.value)}
              onFocus={() => dd_to_setIsOpen(true)}
              onBlur={() => dd_to_setIsOpen(false)}
            ></input>

            <div className="search-form">
              <div className={'dropdown2-' + (dd_to_isOpen ? 'open' : 'closed')}>
                {locationMatch.map(location => {
                  return (
                    <a href="#">{location}</a>
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
      {/* <h3> Some text #2 {locationMatch + "\n"}</h3> */}
    </div>
  )
}