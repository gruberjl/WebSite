import React from "react"
import { useState, useEffect } from 'react'
import { navigate } from "gatsby"
import GitBitImg from "../images/gitbit-icon-light-50x50.png"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {onAuthStateChanged} from './firebase/on-auth-state-changed'
import {signOut} from './firebase/sign-out'
import { Link } from "gatsby"
import "./page.css"

const navBarStyles = {
  marginBottom: '24px',
}

export default function PageHeader() {
  const [uid, setUid] = useState('')
  // const [rightNavStyles, setRightNavStyles] = useState({display: 'flex!important'})
  const isBrowser = () => typeof window !== 'undefined'

  useEffect(() => {
    if (isBrowser()) {
      const unsubscribe = onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid)
        } else {
          setUid('')
        }
      })

      return () => unsubscribe()
    }
  }, [])

 
  const signout = () => {
    signOut().then(() => {
      navigate('/')
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark" style={navBarStyles}>
      <Container>
        <Navbar.Brand as={Link} to="/"><img src={GitBitImg} alt="GitBit Logo" width='40' height='40' /> | GitBit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            { uid ?
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link> :
              <Nav.Link as={Link} to="/">Home</Nav.Link>
            }
            <Nav.Link as={Link} to="/tests">My Tests</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className={uid === '' ? 'justify-content-end display-none' : 'justify-content-end'}>
          { uid ?
            <Button variant="outline-light" onClick={signout}>Sign Out</Button> :
            <Button variant="outline-light" as={Link} to='/sign-up'>Sign Up</Button>
          }

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
