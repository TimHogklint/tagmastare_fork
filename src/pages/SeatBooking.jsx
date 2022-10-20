import { Link } from "react-router-dom";
import store from '../functions/localstorage'

import SeatChooser from '../components/SeatChooser'
import carriageImg from '../images/carriage-type-2.jpg'


export default function SeatBooking() {

  let data = store;

  return (
    <div className="main">

      <div className="navbar">
        <div className="goback">
          <Link className="goback-link" to="/">X Gå tillbaka</Link>
        </div>
      </div>

      <div className="container">
        <div className="content">
          <div className="user-data" style={{ borderStyle: "solid", borderColor: "red", width: "100%" }}>
            <h3>Plats bokning för rutt : {data.originStation} - {data.destinationStation} </h3>

            {/* <h3>data[0]</h3> */}
            {/* Just uncomment to see our data from booking page */}
            {/* {JSON.stringify(data)}; */}

            <div className="carriage-content" style={{ display: "flex", justifyContent: "center", borderStyle: "solid", borderColor: "red" }}>
              <img className="carriage" src={carriageImg} alt="carriage image" style={{ display: "flex", justifyContent: "center", borderStyle: "solid", borderColor: "magenta" }} />

            </div>

            {/* <input className="indexInput" placeholder="Highlight index" onChange={(e) => highlightIndex(e.target.value)}></input> */}
          </div>
        </div>
      </div>

      {/* Im leaving a temp link here to illustrate the flow of the page. You'd pick your seat and then 
          navigate to "Köp" or something - grayed out if you havent selected all seats you choose persons for vuxna , kids etc. */}
      <Link className="temp-pay-link" to="/payment">Temp goto payment</Link>
    </div>
  )
}