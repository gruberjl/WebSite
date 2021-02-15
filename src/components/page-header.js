import React from "react"
import GitBitImg from "../images/gitbit-icon-light-50x50.png"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

const navBarStyles = {
  marginBottom: '24px',
}

export default function PageHeader() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" style={navBarStyles}>
      <Container>
        <Navbar.Brand href="/"><img src={GitBitImg} alt="GitBit Logo" width='40' height='40' /> | GitBit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
