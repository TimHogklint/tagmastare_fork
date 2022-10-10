import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Button } from '../components/bootstrap-components'
import userIcon from '../images/user.png';


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

    <div className='login-section'>
      <img src={userIcon} alt="User Icon" />
      
    <form className="login-form" onSubmit={ handleSubmit }>
      <label>Email</label>
      <input
        type='email'
        onChange={ (e) => setEmail(e.target.value) }
        value={email}
        id='staticEmail'
        placeholder='Email'
      />
      <label>Lösenord</label>
      <input
        type='password'
        onChange={ (e) => setPassword(e.target.value) }
        value={password}
        //class='form-control'
        id='inputPassword'
        placeholder='Lösenord'
        />
        
      <Button className='login-btn'>Logga in</Button>
      <h3>Har du ingen konto? Registrera dig här.</h3>

      <Button>
        <Link className="register-link" to="/register">Registrera</Link>
      </Button>
      </form>
    </div>
  </div>
  );
}