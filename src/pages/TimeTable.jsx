import { Link } from "react-router-dom";
import SeatChooser from "../components/SeatChooser";
export default function TimeTable() {

  return (
    <div className="main">
      <div className="navbar">
        <div className="goback">
          <Link className="goback-link" to="/">X Gå tillbaka</Link>
          <SeatChooser carriageType={1}/>
        </div>
      </div>
    </div>
  )
}