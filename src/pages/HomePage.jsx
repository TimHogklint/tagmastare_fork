import Header from '../components/Header'
import { Button } from '../components/bootstrap-components'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {

  const navigate = useNavigate()
  function goToSearch() {
    navigate("/Booking")
  }

  return (
    <body className="home-page">
      <Header />
      <div className="home-page-button">
        <Button onClick={goToSearch}>Sök Resa</Button>
      </div>
    </body>


  )
}