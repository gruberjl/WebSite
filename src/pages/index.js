import * as React from "react"
import { useState } from 'react'
import Page from '../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import M365CertificationImg from '../images/microsoft365-security-administrator-associate-600x600.png'
import firebase from 'gatsby-plugin-firebase-app'

// styles
const landingStyles = {
  alignItems: 'center',
  display: 'flex',
  minHeight: 'calc(100vh - 66px)',
  position: 'relative',
  zIndex: 1,
  backgroundColor: '#212529',
  color: 'white',
  marginTop: '-24px'
}

const alignCenterStyles = {
  display: 'flex',
  alignItems: 'center',
}

const imageCenterStyles = {
  display: 'flex',
  justifyContent: 'center',
}

const buttonStyles = {
  margin: '12px 0px'
}

const IndexPage = () => {
  const [uid, setUid] = useState('')
  // const [rightNavStyles, setRightNavStyles] = useState({display: 'flex!important'})

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid)
    }
  })

  return (
    <Page>
      <main>
        <div style={landingStyles}>
        <Container>
          <Row style={alignCenterStyles}>
                <Col style={imageCenterStyles}>
                  <img src={M365CertificationImg} alt="Microsoft 365 MS-500 Logo" width='340' height='340'/>
                </Col>
                <Col>
                  <Row>
                    <h1>Get Certified in MS-500 Microsoft 365 Security Administration</h1>
                  </Row>
                  { uid
                      ? (
                        <Row style={buttonStyles}>
                          <Button variant="primary" size="lg" href='/tests'>Go to tests</Button>
                        </Row>
                      )
                      : (
                        <span>
                          <Row style={buttonStyles}>
                            <Button variant="primary" size="lg" href='/sign-up'>Get Started Now</Button>
                          </Row>
                          <Row style={buttonStyles}>
                            <Button variant="secondary" size="lg" href='/login'>I already have an account</Button>
                          </Row>
                        </span>
                      )
                    }
                </Col>
              </Row>
          </Container>
        </div>
      </main>
    </Page>
  )
}

export default IndexPage
