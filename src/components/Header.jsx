import { Navbar, Container, Nav } from "../components/bootstrap-components"
import Logo from "../images/logo.png"
//import { Link } from "react-router-dom"
import React from "react"

export default function Header() {
  return (
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Container className="header-container">
          {/* <Navbar.Brand className="head-title" href="/">
            <img className="logo"  src={Logo} alt="logo" />
          </Navbar.Brand> */}

        <Nav className="me-auto">
          
          <Nav.Link className="head-logo" to="biljetter"><img className="logo"  src={Logo} alt="logo" /></Nav.Link>
          <Nav.Link className="head-link" to="biljetter">Biljetter</Nav.Link>
              <Nav.Link className="head-link" to="/time-table">Tidtabell</Nav.Link>
              <Nav.Link className="head-link" to="/logg-in">Logg in</Nav.Link>
            </Nav>

        </Container>
      </Navbar>
  )
}
