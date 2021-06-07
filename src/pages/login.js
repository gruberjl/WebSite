import * as React from "react"
import { useState } from 'react'
import Page from '../components/page'
import { navigate } from "gatsby"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import firebase from 'gatsby-plugin-firebase-app'

const formStyles = {
  marginBottom: '16px',
}

const emailStyles = {
  marginBottom: '12px'
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  const submit = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        navigate('/course/ms-500')
      })
      .catch((error) => {
        setErr(error.message)
      })
  }

  return (
    <Page>
      <main>
        <Container>
          <Row>
            <Col>
              <h1>Sign in</h1>
              <Form>
                <Form.Group controlId="formBasicEmail" style={emailStyles}>
                  <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" style={formStyles}>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Alert variant='danger' className={err === '' ? 'd-none' : ''}>
                  {err}
                </Alert>

                <Button variant="primary" type="button" onClick={submit}>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </Page>
  )
}
