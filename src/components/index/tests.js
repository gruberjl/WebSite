import React from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link, navigate } from "gatsby"
import {onAuthStateChanged, deleteDoc} from '../firebase'

const isBrowser = () => typeof window !== 'undefined'

export default class Tests extends React.Component {
  constructor(props) {
    super(props)
    this.setUid = this.setUid.bind(this)
    this.addDocs = this.addDocs.bind(this)
    this.deleteTest = this.deleteTest.bind(this)

    this.state = {
      tests: [],
      uid: ''
    }
  }
 
  componentDidMount() {
    if (isBrowser()) {
      this.onAuthStateChangedListener = onAuthStateChanged(this.setUid)
    }
  }

  componentWillUnmount() {
    this.onAuthStateChangedListener()
  }

  setUid(user) {
    if (user) {
      this.setState({
        uid: user.uid
      })

      getAllDocs(`/users/${this.state.uid}/tests`).then(this.addDocs)
    } else {
      navigate("/login")
    }
  }

  addDocs(docs) {
    this.setState({
      tests: docs
    })
  }

  deleteTest(event) {
    const db = getDb()
    const id = event.target.dataset.id
    deleteDoc(`users/${this.state.uid}/tests`, id).then(() => {
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
