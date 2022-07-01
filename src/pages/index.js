import * as React from "react"
import { useState } from 'react'
import Page from '../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import M365CertificationImg from '../images/microsoft365-security-administrator-associate-600x600.png'
import { onAuthStateChanged } from "../components/firebase"
import { Link } from "gatsby"
import {AiOutlineCheck} from 'react-icons/ai'
import ContentsRead from '../components/contents-read'

// styles
const landingStyles = {
  alignItems: 'center',
  display: 'flex',
  minHeight: 'calc(100vh - 66px)',
  position: 'relative',
  zIndex: 1,
  marginTop: '-24px',
  backgroundColor: '#212529',
  color: 'white'
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

const checkmarkStyle = {
  fontSize: '32px',
  color: '#98FF98',
  marginRight: '12px'
}

const margin50Style = {
  marginTop: '50px',
  marginBottom: '50px'
}

const jsonLd = {
  "@type": "Course",
  headline: 'Training for MS-500: Microsoft Office 365 Security Admin',
  "name": "Training for MS-500: Microsoft Office 365 Security Admin",
  "description": "Get Certified in MS-500 Microsoft 365 Security Administration",
  "provider": {
    "@type": "Organization",
    "name": "GitBit",
    "sameAs": "http://www.gitbit.org"
  },
  keywords: [
    "Microsoft",
    "Microsoft 365",
    "Office 365",
    'MS-500',
    'Microsoft 365 Security Administration'
  ],
  "author": {
    "@type": "Person",
    "name": "John Gruber",
    url: 'https://medium.com/@gruberjl'
  }
}

const isBrowser = () => typeof window !== 'undefined'

const IndexPage = () => {
  const [uid, setUid] = useState('')
  // const [rightNavStyles, setRightNavStyles] = useState({display: 'flex!important'})

  React.useEffect(() => {
    if (isBrowser()) {
      const onAuthStateChangedListener = onAuthStateChanged(user => {
        if (user) {
          setUid(user.uid)
        } else {
          setUid('')
        }
      })

      return () => onAuthStateChangedListener()
    }
  }, [])

  return (
    <Page jsonLdType={'Course'} jsonLd={jsonLd} image={'https://www.gitbit.org/static/microsoft365-security-administrator-associate-600x600-e6a7d1d05ac4bbec0f513cfbacb25c98.png'} canonical={'https://gitbit.org'} title={'Training for MS-500: Microsoft Office 365 Security Admin'} description={"Get Certified in MS-500 Microsoft 365 Security Administration"}>
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
                      <Button variant="primary" as={Link} size="lg" to='/dashboard'>Go to dashboard</Button>
                    </Row>
                  )
                  : (
                    <span>
                      <Row style={buttonStyles}>
                        <Button variant="primary" as={Link} size="lg" to='/sign-up'>Get Started Now</Button>
                      </Row>
                      <Row style={buttonStyles}>
                        <Button variant="secondary" as={Link} size="lg" to='/login'>I already have an account</Button>
                      </Row>
                    </span>
                  )
                }
                <Row style={buttonStyles}>
                  <Button variant="info" as={Link} size="lg" to='/course/ms-500/browse-questions/'>Browse practice questions</Button>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="article">
          <Container style={margin50Style}>
            <Row>
              <Col>
                <h2>What you'll learn</h2>
              </Col>
            </Row>
            <Row>
              <Col md={6} className='margin12 flex'><AiOutlineCheck style={checkmarkStyle} /><span>Everything you need to know to pass the MS-500: Microsoft 365 Security Administration.</span></Col>
              <Col md={6} className='margin12 flex'><AiOutlineCheck style={checkmarkStyle} /><span>Creating and manaing admin roles including time-limited admin roles.</span></Col>
              <Col md={6} className='margin12 flex'><AiOutlineCheck style={checkmarkStyle} /><span>Creating and managing conditional access policies</span></Col>
              <Col md={6} className='margin12 flex'><AiOutlineCheck style={checkmarkStyle} /><span>How to implement multi-factor authentication (MFA)</span></Col>
              <Col md={6} className='margin12 flex'><AiOutlineCheck style={checkmarkStyle} /><span>Setup and manage self service password reset (SSPR)</span></Col>
              <Col md={6} className='margin12 flex'><AiOutlineCheck style={checkmarkStyle} /><span>What's Microsoft Defender</span></Col>
              <Col md={6} className='margin12 flex'><AiOutlineCheck style={checkmarkStyle} /><span>Setup and manage Microsoft Defender for Identity</span></Col>
              <Col md={6} className='margin12 flex'><AiOutlineCheck style={checkmarkStyle} /><span>Protecting Windows 10 and other user devices using Microsoft Defender for Endpoint</span></Col>
              <Col md={6} className='margin12 flex'><AiOutlineCheck style={checkmarkStyle} /><span>Managing Microsoft Defender for Cloud Apps</span></Col>
              <Col md={6} className='margin12 flex'><AiOutlineCheck style={checkmarkStyle} /><span>How to classify data using labele</span></Col>
              <Col md={6} className='margin12 flex'><AiOutlineCheck style={checkmarkStyle} /><span>Managing data retention to conform to compliance</span></Col>
              <Col md={6} className='margin12 flex'><AiOutlineCheck style={checkmarkStyle} /><span>Preventing accidental and malicious data loss with DLP policies</span></Col>
              <Col md={6} className='margin12 flex'><span>AND MORE!</span></Col>
            </Row>
          </Container>
          <div style={margin50Style}>
            <Container>
              <Row>
                <Col>
                  <h2>What you'll need to know before getting started</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ul>
                    <li className="margin12">Basic knowledge of Windows 10 devices</li>
                    <li className="margin12">Basic understanding of Office 365</li>
                    <li className="margin12">Simple understanding of authorization and authentication</li>
                    <li className="margin12">Basic understanding of computer networking</li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </div>
          <Container style={margin50Style}>
            <Row>
              <Col>
                <h2>Course content</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <ContentsRead />
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    </Page>
  )
}

export default IndexPage
