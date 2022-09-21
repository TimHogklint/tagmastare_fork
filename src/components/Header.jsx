import { Navbar, Container, Nav } from "../components/bootstrap-components"
import Logo from "../images/logo.png"
import { Link } from "react-router-dom"
import React from "react"

export default function Header() {
  return (
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Container className="header-container">
          <Nav className="me-auto">
            <Link className="head-logo" to="/"><img className="logo"  src={Logo} alt="logo" /></Link>
            <Link className="head-link" to="/logg-in">Logg in</Link>
            <Link className="head-link" to="/time-table">Tidtabell</Link>
            <Link className="head-link" to="/ticket">Biljetter</Link>
          </Nav>
        </Container>
      </Navbar>
  )
}
