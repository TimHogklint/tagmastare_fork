import React, {useState} from 'react';
import { Button } from '../components/bootstrap-components'
import { Link } from "react-router-dom";
import {useSignup} from "../../server/RestApi/userSignup"
//const User = require('../../server/models/-User')





export default function Register(){
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const {  error, isLoading } = useSignup()

 /*  const createUser = async (req, res) => {
    const { customerName, email, phone, password } = req.body
    
      try {
      const user = await User.create({ customerName, email, phone, password })
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  } */
  
  const handleSubmit = async (e) => {
    e.preventDefault()
      const user = {customerName, email, phone, password}

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
    <div>
      <div className="goback">
        <Link className="goback-link" to="/Logg-In">X Gå tillbaka</Link>
      </div>
        
      <form onSubmit={handleSubmit }>
        <h1>Registrera</h1>
        <label >Namn</label>
        <input
            type='text'
            placeholder='Namn'
            onChange={ (e) => setCustomerName(e.target.value) }
            value={ customerName } />

         <label  >Email</label>
          <input
            type='email'
            placeholder='Email'
            onChange={ (e) => setEmail(e.target.value) }
          value={ email }/>

        <label >Mobil</label>
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

          <Button disabled={ isLoading } type='submit'>Skapa konto</Button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    );
  
}

