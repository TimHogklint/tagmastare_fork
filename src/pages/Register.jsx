import React, {useState} from 'react';
import { Button } from '../components/bootstrap-components'
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/userSignup"
import userIcon from '../images/user.png';
const validator = require('validator')


export default function Register(){
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const {  error, isLoading } = useSignup()
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
      const user = {customerName, email, phone, password}

      if (!customerName || !email || !phone || !password ) {
        throw Error('Alla fälten måste fyllas i')
      }
      if (!validator.isEmail(email)) {
        throw Error ('Email är inte giltig')
      }
      if (!validator.isStrongPassword(password)) {
        throw Error ('Lösenord är inte stark')
      }

      const exists = await this.findOne({ email })
      if (exists) {
        throw Error ('Email används redan')
      }


    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (response.ok) {
      setCustomerName('')
      setEmail('')
      setPhone('')
      setPassword('')
      console.log('new user created', json)
    }
    
  }
  
  return (
    <div className="register-page">
      <div className="goback">
        <Link className="goback-link" to="/Logg-In">X Gå tillbaka</Link>
    </div>

    <div className="register-section">  
      <img className="user-image" src={userIcon} alt="User Icon" />
      
      <form className="register-form" onSubmit={ handleSubmit }>
        <label>Namn</label>
        <input
          type='text'
          placeholder='Namn'
          onChange={ (e) => setCustomerName(e.target.value) }
          value={ customerName } />

        <label>Email</label>
        <input
          type='email'
          placeholder='Email'
          onChange={ (e) => setEmail(e.target.value) }
          value={ email }/>

        <label>Telefonnummer</label>
        <input
          type='tel'
          placeholder='Mobilnummer'
          onChange={ (e) => setPhone(e.target.value) }
          value={ phone }/>
          
        <label >Lösenord</label>
        <input
          type='password'
          placeholder='Lösenord'
          onChange={ (e) => setPassword(e.target.value) }
          value={ password }/>

          <Button className="logg-in-button" disabled={ isLoading } type='submit'>Skapa konto</Button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
      </div>
    );
  
}

