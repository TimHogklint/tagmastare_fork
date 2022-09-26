import {BrowserRouter, Routes, Route} from "react-router-dom"
//import { useState, useEffect } from "react"

//Import functions
//import {getTest} from "./functions/test"

//Import pages
import HomePage from "./pages/HomePage"
import TimeTable from "./pages/TimeTable"
import LoggIn from "./pages/LoggIn"
import Booking from "./pages/Booking"
import Search from "./pages/Search"
import Ticket from "./pages/Ticket"
import Register from "./pages/Register"
import GetTicket from "./pages/GetTicket"
import Payment from "./pages/Payment"

//Import connection to design
//All files created in mapp sass should be imported in main.scss
import "./sass/main.scss"

//Commenterar bort det för att kunna testa DB
/* function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
} */


//Test DB
export default function App() {
/*   const [data, setData] = useState("Hello World!")
  useEffect(() => {
    getTest()
      .then((res) => {
      setData(res.message)
      })
    .catch((err) => console.log(err))
  }, []) */

  return (
    <main>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <HomePage /> }></Route>
          <Route path="/time-table" element={ <TimeTable /> }></Route>
          <Route path="/logg-in" element={ <LoggIn /> }></Route>
          <Route path="/booking" element={ <Booking /> }></Route>
          <Route path="/search" element={ <Search /> }></Route>
          <Route path="/ticket" element ={<Ticket/>}></Route>
          <Route path="/booking" element={<Booking />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/get-ticket" element ={<GetTicket/>}></Route>
        </Routes>
       
      </BrowserRouter>
    </main>
  );
}


