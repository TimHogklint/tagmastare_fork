import React from "react";
import { Link } from "react-router-dom";


export default function Booking() {
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
            <input className="searchfield" type="search" placeholder="Till"></input>
            <input className="searchfield" type="search" placeholder="Från"></input>
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
    </div>

  )
}