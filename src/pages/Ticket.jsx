import React from "react";
import { Link } from "react-router-dom";
import { Button } from '../components/bootstrap-components'
import ticket from '../images/ticket.png';

export default function Ticket() {
    const inputStyle = {
    padding: '3%',
    marginTop: '5%',
    marginBottom: '10%',
  };

  return (
    <div>
     <div className="goback">
       <Link className="goback-link" to="/">X Gå tillbaka</Link>
      </div>
      
    <div className='login'>
      <div className='login-container'>
          <div className='Heading'> 
         <img src={ticket} alt="" />    
          </div>
          <h3>Logga in för att se dina biljetter och årskort.
            Du kan också hämta biljetter med bokningsnummer.</h3>
        <form>
          <div class='form-group row'>
            <label for='staticEmail' class='col-sm-1 col-form-label'>
              Email
            </label>
            <div class='col-sm-10'>
              <input
                style={inputStyle}
                type='text'
                readonly
                class='form-control-plaintext'
                id='staticEmail'
                placeholder='Email'
              />
            </div>
          </div>
          <div class='form-group row'>
            <label for='inputPassword' class='col-sm-1 col-form-label'>
              Lösenord
            </label>
            <div class='col-sm-10'>
              <input
                style={inputStyle}
                type='password'
                class='form-control'
                id='inputPassword'
                placeholder='Lösenord'
              />
            </div>
          </div>
        </form>
        <div className='btn'>
          <Button className='login-btn'
          >
            Logga in
          </Button>
          </div>
          <h4>Eller?</h4>

      <div className='btn'>
          <Button className="ticket-btn"
          
            >
            <Link className="getTicket-link" to="/get-ticket"> Hämta Biljett</Link>
          </Button>
        </div>
      </div>
      </div>
    </div>
  );
}