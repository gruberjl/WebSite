import * as React from "react"
import { convertFromRaw } from 'draft-js'
import Page from '../../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Link } from "gatsby"
import {getAllDocs} from '../../../components/firebase'

class EditPage extends React.Component {
  constructor(props) {
    super(props)
    this.addDocs = this.addDocs.bind(this)

    const isBrowser = () => typeof window !== 'undefined'

    if (isBrowser()) {
      getAllDocs('Tests/MS-500/Questions').then(this.addDocs)
    }

    this.state = {
      docs: []
    }
  }
 
  addDocs(docs) {
    const newDocs = docs.map(doc => {
      doc.question = convertFromRaw(doc.question).getPlainText()
      return doc
    })

    this.setState({
      docs: newDocs
    })
  }

  render() {
    return (
      <Page title={'Microsoft 365 MS-500 practice test questions'} description={'Microsoft 365 MS-500 practice test questions edit page'}>
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
                          <td><Button variant="link" as={Link} to={`/course/ms-500/question/edit/?docid=${doc.id}`}>{doc.question}</Button></td>
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
