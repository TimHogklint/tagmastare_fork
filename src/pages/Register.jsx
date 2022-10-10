import React, {Component} from 'react';
import { Button } from '../components/bootstrap-components'
import { Link } from "react-router-dom";



/* export default function Register() */
class Register extends Component {

  constructor (props) {
    super(props)
    this.state = {
      customerName: "",
      email: "",
      phoneNumber: "",
      password: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleSubmit(e) {
    e.preventDefault()
    const { customerName, email, phoneNumber, password } = this.state
    console.log(customerName, email, phoneNumber, password)
  }
  render() {
    return (
    <div>
      <div className="goback">
        <Link className="goback-link" to="/Logg-In">X Gå tillbaka</Link>
      </div>
        
      <form onSubmit={ this.handleSubmit }>
        <h1>Registrera</h1>
        <label >Namn</label>
        <input
          type='text'
          placeholder='Förnamn'
          onChange = {(e) => this.setState({customerName: e.target.value})}/>

         <label  >Email</label>
          <input
            type='email'
            placeholder='Email'
            onChange = {(e) => this.setState({email: e.target.value})}/>

        <label >Mobil</label>
          <input
            type='tel'
            placeholder='Mobilnummer'
            onChange = {(e) => this.setState({phoneNumber: e.target.value})}/>
          
        <label >Lösenord</label>
          <input
            type='password'
            placeholder='Lösenord'
            onChange = {(e) => this.setState({password: e.target.value})}/>
            
          {/* <div class='form-group row'>
            <label for='inputPassword' class='col-sm-2 col-form-label'>
              Upprepa Lösenord
            </label>
            <div class='col-sm-10'>
              <input
 
                type='password'
                class='form-control'
                id='inputPassword'
                placeholder='Upprepa lösenord'
              /> */}
          <Button type='submit'>Skapa konto</Button>
        </form>
      </div>
    );
  }
}
export default Register;
