import React from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link, navigate } from "gatsby"
import firebase from 'gatsby-plugin-firebase-app'

export default class Tests extends React.Component {
  constructor(props) {
    super(props)
    this.setUid = this.setUid.bind(this)
    this.addDoc = this.addDoc.bind(this)
    this.deleteTest = this.deleteTest.bind(this)

    this.state = {
      tests: [],
      uid: ''
    }

    const isBrowser = () => typeof window !== 'undefined'

    if (isBrowser()) {
      firebase.auth().onAuthStateChanged(this.setUid)
    }
  }

  setUid(user) {
    if (user) {
      this.setState({
        uid: user.uid
      })

      const db = firebase.firestore()
      db.collection("users").doc(this.state.uid).collection('tests').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.addDoc(doc)
        })
      })
    } else {
      navigate("/login")
    }
  }

  addDoc(doc) {
    const newTests = [...this.state.tests]
    const data = doc.data()
    data.id = doc.id
    newTests.push(data)

    this.setState({
      tests: newTests
    })
  }

  deleteTest(event) {
    const id = event.target.dataset.id
    const db = firebase.firestore()
    db.collection("users").doc(this.state.uid).collection('tests').doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={10}>
            <h1>Tests</h1>
          </Col>
          <Col xs={2} className='text-end'>
            <Button as={Link} to="/tests/new">Start New</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Course</th>
                  <th>Number of Questions</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tests.map((doc, idx) => (
                  <tr key={idx}>
                    <td>{doc.id}</td>
                    <td><Button variant="link" as={Link} to={`/course/ms-500/test/?testid=${doc.id}`}>MS-500</Button></td>
                    <td>{Object.keys(doc.questions).length}</td>
                    <td><Button onClick={this.deleteTest} data-id={doc.id}>Delete</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    )
  }
}
