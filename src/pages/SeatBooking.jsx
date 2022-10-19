import { Link } from "react-router-dom";
import store from '../functions/localstorage'

export default function SeatBooking() {

  let data = store;

  return (
    <div className="main">
        <h3>Plats bokning för rutt : {data.originStation} - {data.destinationStation} </h3>
        {/* <h3>data[0]</h3> */}
        {/* Just uncomment to see our data from booking page */}
        {/* {JSON.stringify(data)}; */}
    </div>
  )
}