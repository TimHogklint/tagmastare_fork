import React from 'react'
import Header from '../components/Header'
import { Button } from '../components/bootstrap-components'
import Search from "./Search"
import { Route } from 'react-router-dom'

export default function HomePage() {
  return (
    <body className="home-page">
      <Header />
      <div className="home-page-button">
      <Button onCLick={<Route path="/search" element ={<Search/>}></Route>}>Sök Resa</Button>
      </div>
    </body>
     
      
  )
}