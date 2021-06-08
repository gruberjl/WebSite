import * as React from "react"
import { convertFromRaw } from 'draft-js'
import Page from '../../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Link } from "gatsby"
import firebase from 'gatsby-plugin-firebase-app'

class EditPage extends React.Component {
  constructor(props) {
    super(props)
    this.addDoc = this.addDoc.bind(this)

    const isBrowser = () => typeof window !== 'undefined'

    if (isBrowser()) {
      const db = firebase.firestore()

      db.collection("Tests").doc("MS-500").collection('Questions').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.addDoc(doc)
        })
      })
    }

    this.state = {
      docs: []
    }
  }

  addDoc(doc) {
    const newDocs = [...this.state.docs]
    const data = doc.data()
    data.question = convertFromRaw(data.question).getPlainText()
    data.id = doc.id
    newDocs.push(data)

    this.setState({
      docs: newDocs
    })
  }

  render() {
    return (
      <Page>
        <main>
          <div>
            <Container>
              <Row>
                <Col xs={10}>
                  <h1>Questions</h1>
                </Col>
                <Col xs={2} className='text-end'>
                  <Button as={Link} to="/course/ms-500/question/edit">Add</Button>
                </Col>
                </Row>
                <Row>
                <Col>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Question</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.docs.map((doc, idx) => (
                        <tr key={idx}>
                          <td>{doc.id}</td>
                          <td><Button variant="link" as={Link} to={`/course/ms-500/question/edit/?docid=${doc.id}`}>{doc.question.substring(0, 100)}</Button></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          </div>
        </main>
      </Page>
    )
  }
}

export default EditPage
