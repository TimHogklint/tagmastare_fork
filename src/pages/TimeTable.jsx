import QrCode from "react-qr-code";
import { Link } from "react-router-dom";
export default function TimeTable() {
  return (
    <div className="main">
      <div className="navbar">
        <div className="goback">
          <Link className="goback-link" to="/">X Gå tillbaka</Link>
        </div>
      </div>
    </div>
  )
}