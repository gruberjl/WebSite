import React from "react"
import { useState } from 'react'
import GitBitImg from "../images/gitbit-icon-light-50x50.png"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import firebase from 'gatsby-plugin-firebase-app'
import "./page.css"

const navBarStyles = {
  marginBottom: '24px',
}

export default function PageHeader() {
  const [uid, setUid] = useState('')
  // const [rightNavStyles, setRightNavStyles] = useState({display: 'flex!important'})

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid)
    }
  })

  const signout = () => {
    firebase.auth().signOut().then(() => {
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark" style={navBarStyles}>
      <Container>
        <Navbar.Brand href="/"><img src={GitBitImg} alt="GitBit Logo" width='40' height='40' /> | GitBit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/tests">My Tests</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className={uid === '' ? 'justify-content-end display-none' : 'justify-content-end'}>
          <Button variant="outline-light" onClick={signout}>Sign Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
