import React from 'react';
import { Button } from '../components/bootstrap-components'
import { Link } from "react-router-dom";


export default function Register() {
  const inputStyle = {
    padding: '3%',
    marginTop: '5%',
    marginBottom: '10%',
  };

  return (
     <div>
     <div className="goback">
          <Link className="goback-link" to="/Logg-In">X Gå tillbaka</Link>
      </div>
    <div className='register'>
      <div className='register-container'>
        <div className='Heading'>
          <h1>Registrera</h1>
        </div>
        <form>
          <div class='form-group row'>
            <label for='staticEmail' class='col-sm-2 col-form-label'>
              Förnamn
            </label>
            <div class='col-sm-10'>
              <input
                style={inputStyle}
                type='text'
                readonly
                class='form-control-plaintext'
                id='staticEmail'
                placeholder='Förnamn'
              />
            </div>
          </div>
          <div class='form-group row'>
            <label for='staticEmail' class='col-sm-2 col-form-label'>
              Efternamn
            </label>
            <div class='col-sm-10'>
              <input
                style={inputStyle}
                type='text'
                readonly
                class='form-control-plaintext'
                id='staticEmail'
                placeholder='Efternamn'
              />
            </div>
          </div>
          <div class='form-group row'>
            <label for='staticEmail' class='col-sm-2 col-form-label'>
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
            <label for='inputMobileNumber' class='col-sm-2 col-form-label'>
              Mobil
            </label>
            <div class='col-sm-10'>
              <input
                style={inputStyle}
                type='MobileNumber'
                readonly
                class='form-control'
                id='inputMobileNumber'
                placeholder='Mobilnummer'
              />
            </div>
          </div>
          <div class='form-group row'>
            <label for='inputPassword' class='col-sm-2 col-form-label'>
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
          <div class='form-group row'>
            <label for='inputPassword' class='col-sm-2 col-form-label'>
              Upprepa Lösenord
            </label>
            <div class='col-sm-10'>
              <input
                style={inputStyle}
                type='password'
                class='form-control'
                id='inputPassword'
                placeholder='Upprepa lösenord'
              />
            </div>
          </div>
        </form>
        <div>
          <Button className='createaccountbtn'
          >
            Skapa konto
          </Button>
        </div>
      </div>
      </div>
      </div>
  );
}
