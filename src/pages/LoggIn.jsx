import React from "react";
import { Link } from "react-router-dom";
import { Button } from '../components/bootstrap-components'
import user from '../images/user.png';

export default function LoggIn() {
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
          <img src={user} alt="" />
        </div>
        <form>
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
        </form>
        <div className='btn'>
          <Button className='loginbtn'
          >
          Logga in
          </Button>
        </div>
        <div className='Register-heading'>
          <h3>Har du ingen konto?</h3>
          <h4>Registrera dig här.</h4>
        </div>
        <div className='btn'>
          <Button
           
            >
              <Link className="register-link" to="/register">Registrera</Link>
            
            </Button>
            
        </div>
      </div>
      </div>
    </div>
  );
}