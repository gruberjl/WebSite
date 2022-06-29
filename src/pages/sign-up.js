import * as React from "react"
import { useState } from 'react'
import Page from '../components/page'
import { navigate, Link } from "gatsby"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import {createUserWithEmailAndPassword, saveDoc} from '../components/firebase'

const formStyles = {
  marginBottom: '16px',
}

const emailStyles = {
  marginBottom: '12px'
}

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
 
  const submit = () => {
    createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const data = {
          id: userCredential.user.uid,
          role: 'student',
          uid: userCredential.user.uid
        }
        saveDoc('courses/MS-500/users/', data)
        navigate('/dashboard')
      })
      .catch((error) => {
        console.log(error.code)
        console.log(error.message)
        setErr(error.message)
      })
  }

  return (
    <Page title={'Sign Up'}>
      <main>
        <Container>
          <Row>
            <Col>
              <h1>Sign up for free to start learning</h1>
              <Form>
                <Form.Group controlId="formBasicEmail" style={emailStyles}>
                  <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
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
                <div>
                  <Link to='/login'>Already have an account? Sign in</Link>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </Page>
  )
}
