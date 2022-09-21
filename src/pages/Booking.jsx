export default function Booking() {
  return (
    <div className="main">
      <div className="navbar">
        <div className="goback">
          X Gå Tillbaka
        </div>
      </div>
      <div className="container">
        <div className="content">
          <div className="input">
            <input type="search" placeholder="Till"></input>
            <input type="search" placeholder="Från"></input>
            <input type="date"></input>
            + lägg till återresa
          </div>
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
        </div>
      </div>
      <div className="button">
        <button>Sök Resa</button>
      </div>
    </div>

  )
}