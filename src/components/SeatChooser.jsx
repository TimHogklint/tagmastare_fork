import { useState, useEffect } from 'react';

export default function SeatChooser(props) {
  let { carriageType, seatsToChoose } = props;

  const [seats, setSeats] = useState([]);

  useEffect(() => {
    (async () => {
      let seatCoords = await (await fetch(`/carriages/vagn${carriageType}Coordinates.json`)).json();
      let occupied = await (await fetch('/db-query-emulate/occupied-seats.json')).json();
      // add occupied to seatCoords data
      for (let seat of seatCoords) {
        let dbSeatInfo = occupied.find(x => x.seatNo === seat.seatNo);
        Object.assign(seat, dbSeatInfo);
      }
      setSeats(seatCoords);
    })();
  }, []);

  function choose(seat) {
    seat.chosen = !seat.chosen;
    if (seats.filter(x => x.chosen).length > seatsToChoose) {
      seat.chosen = false;
    }
    setSeats([...seats]);
  }

  function seatDiv(seat) {
    let { _id, x, y, occupied, chosen } = seat;
    let img = document.querySelector('img.carriage');
    let w = img.offsetWidth;
    return <div key={_id} className={
      'seat-overlay'
      + (occupied ? ' occupied' : ' free')
      + (chosen ? ' chosen' : '')
    } style={{
      position: 'absolute',
      left: (x / 100 * w - w / 200 * 2.3) + 'px',
      top: (y / 100 * w - w / 200 * 2.0) + 'px',
      width: w / 100 * 2.3 + 'px',
      height: w / 100 * 2 + 'px',
    }} onClick={() => !occupied && choose(seat)} />
  }

  return <div className="seat-chooser">
    <p className="instructions">Välj {seatsToChoose} säten!</p>
    <div className="image-holder">
        <img src="carriages/vagn1.png"/>
      <img className="carriage" src={`./carriages/vagn${carriageType}.png`} />
      {seats.map(seatDiv)}
    </div>
    <p className='chosen-info'>Valda säten:&nbsp;
      {seats
        .filter(x => x.chosen)
        .map((x, i) => <span key={x._id}>{i ? ', ' : ''}{x.seatNo}</span>)}
      {!seats
        .filter(x => x.chosen).length ? null : <div className="ids">När du slutför bokningen tänker jag skapa biljetter med följande sätes-id:n: {seats
          .filter(x => x.chosen)
          .map((x, i) => <span key={x._id}>{i ? ', ' : ''}{x._id}</span>)}</div>}
    </p>
  </div >
}