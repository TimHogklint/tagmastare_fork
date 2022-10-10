
import { Link } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { Button } from '../components/bootstrap-components'
import imageIcon from '../images/ticket.png'


export default function GetTicket() {

  const [ticket, setTicket] = useState(null)
  
  useEffect(() => {
    const fetchTicket = async () => {
      const response = await fetch('http://localhost:3000/api/tickets')
      const json = await response.json()

      if (response.ok) {
        setTicket(json)
      }
    }
    fetchTicket()
    }, [])
  
  
  return (
    <div className="get-ticket-page">
      <div className="goback">
          <Link className="goback-link" to="/ticket">X Gå tillbaka</Link>
      </div>

      <div className="get-ticket-section">
        <img src={imageIcon} alt="ticket-logo" />
        <label>Ange bokningnummer</label>
        <input type="Booking Number" />
          <div>{ ticket && ticket.map((ticket) => (
            <p key={ ticket._id }>{ ticket.ticketPrice }</p>
          )) }</div>
         <div className='btn'>
          <Button className ='get-ticket-btn'
          
          >
          Hämta Biljett
          </Button>
          </div>
        </div>
    </div>
    
  )
}