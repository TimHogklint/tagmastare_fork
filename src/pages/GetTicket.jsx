import {  json, Link} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { Button } from '../components/bootstrap-components'
import imageIcon from '../images/ticket.png'
import { findDOMNode } from "react-dom";




export default function GetTicket() {
   
  /* const getTicket = async () => {
      const res = await axois.get('http://localhost:3000/api/tickets/${id}')
      console.log(res.data.id)
    }

    useEffect(() => {
      getTicket()
    }, []) */
  
  /* const allTickets = async () => {
    await myTicket.find()
  console.log(allTickets)
  }  */

  
  const [inputTicketId, setInputTicketId] = useState('')
  const [myTicket, setMyTicket] = useState('')

  /* useEffect(async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tickets')
      let data = await response.json() 
      setMyTicket(data)
    } catch (error) {
      console.error(error.message)
    }
    GetTicket() 
  }, []) */

  useEffect(() => {
    const fetchTicket = async () => {
      const response = await (await fetch('http://localhost:3000/api/tickets')).json()
      console.log(response)
      setMyTicket(response)
      
      let myMy = await response.findOne('633deb95270a9bfdbd932b8d')
      console.log(myMy)
      
    }
    fetchTicket(json)
  }, [])

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(inputTicketId)
   

    //setMyTicket(e.target.value)
/* 
      return (
        <div>{ myTicket && myTicket.map((myTicket) => (
          <p key={ myTicket._id }>{ myTicket.ticketPrice }</p>

          
          )) }</div>
      ) */
    }


/*   const getTicketId = () => {
    return (
      <div>
        <h1>My: { inputTicketId }</h1>
      </div>
    )
  } */

/*    static async find(myTicket = '') {
    myTicket && (myTicket = '/api/tickets');
    return [(await (await fetch(`http://localhost:3000/api/tickets`)).json())]
      .flat().map(x => x ? new this(x) : null);
  }
   */
  
  
  
  return (
    <div className="get-ticket-page">
      <div className="goback">
          <Link className="goback-link" to="/ticket">X Gå tillbaka</Link>
      </div>

      <div className="get-ticket-section">
        <img src={ imageIcon } alt="ticket-logo" />
        
        <form className='ticket-form' onSubmit={ handleSubmit }>
        <label>Ange bokningsnummer</label>
        <input
            type="text"
            id="cutomerTicket"
            placeholder='Bokningsnummer'
            onChange={ e => setInputTicketId(e.target.value) }
            value={ inputTicketId } />
          

        <Button className='logg-in-button' type='submit'> Hämta Biljett
            {/* <Link className="button-link" >Hämta Biljett</Link> */}
          </Button>
        </form>
        
        {/* { getTicketId() } */ }
        <div>{ myTicket && myTicket.map((myTicket) => (
          <p key={ myTicket._id }>
            { myTicket.ticketPrice },
            { myTicket.ticketPrice }
          </p>
        )) }</div>

        
        

        </div>
    </div>
    
  )
}