import { Link } from "react-router-dom";
import React from 'react';
import { Button } from '../components/bootstrap-components'

export default function GetTicket() {
    const inputStyle = {
      padding: '.7%',
      paddingLeft: "4%",
      paddingRight:"4%",
      marginTop: '10%',
      marginBottom: '2.5%',
      marginLeft: "41%",
       marginRight: "80%",
    
     
   
  };
  return (
    <div>
     <div className="goback">
          <Link className="goback-link" to="/ticket">X Gå tillbaka</Link>
      </div>
    
      <div class='col-sm-10'>
      
              <input
                style={inputStyle}
                type='bookingnumber'
                class='form-control'
                id='inputBookingNr'
                placeholder='Ange Bokningsnummer'
        />
        <center>
         <div className='btn'>
          <Button className ='getticket'
          
          >
          Hämta Biljett
          </Button>
        </div></center>
            </div>
      </div>
  )
}