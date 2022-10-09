import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Button } from '../components/bootstrap-components'
import user from '../images/user.png';


export default function LoggIn() {
   
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(email, password)
  }

  return (
    <div className="login-page">
     <div className="goback">
          <Link className="goback-link" to="/">X Gå tillbaka</Link>
      </div>

      <div className='Heading'>
        <img src={user} alt="" />
      </div>
      
      <form className="login" onSubmit={ handleSubmit }>
        <div className='form-group row'>
          <label>Email</label>
          <input
            type='email'
            onChange={ (e) => setEmail(e.target.value) }
            value={email}
            id='staticEmail'
            placeholder='Email'
          />
        </div>
        
        <div className='form-group row'>
          <label>Lösenord</label>
          <input
            type='password'
            onChange={ (e) => setPassword(e.target.value) }
            value={password}
            //class='form-control'
            id='inputPassword'
            placeholder='Lösenord'
            />
        </div>
          <Button className='login-btn'>Logga in</Button>
          <div className='Register-heading'>
          <h3>Har du ingen konto?</h3>
          <h4>Registrera dig här.</h4>
          </div>
          <Button>
            <Link className="register-link" to="/register">Registrera</Link>
          </Button>
      </form>
    </div>
  );
}