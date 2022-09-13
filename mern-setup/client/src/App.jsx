import './App.css';
import { useState, useEffect } from "react"

//functions
import {getTest} from "./functions/test"


//Commenterar bort det för att kunna testa DB
/* function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
} */

//Test DB
function App() {
  const [data, setData] = useState("Hello World!")
  useEffect(() => {
    getTest()
      .then((res) => {
      setData(res.message)
      })
    .catch((err) => console.log(err))
  }, [])

  return (
    <div className="App">
      <h1>{data}</h1>
    </div>
  );
}

export default App;
