import * as React from "react"
import shortid from 'shortid'
import { navigate } from "gatsby"
import Page from '../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import firebase from "firebase/app"
import "firebase/firestore"
const db = firebase.firestore()

const alignRightStyles = {
  textAlign: 'right'
}

class TestsNewPage extends React.Component {
  constructor(props) {
    super(props)
    this.handleNumOfQuestionsChange = this.handleNumOfQuestionsChange.bind(this)
    this.createTest = this.createTest.bind(this)
    this.setUid = this.setUid.bind(this)

    this.state = {
      numOfQuestions: 60,
      createTestClicked: false,
      questions: [],
      uid: ''
    }

    firebase.auth().onAuthStateChanged(this.setUid)

    db.collection("Tests").doc("MS-500").collection('Questions').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.addQuestion(doc)
      })
    })
  }

  setUid(user) {
    if (user) {
      this.setState({
        uid: user.uid
      })
      console.log(user.uid)
    } else {
      console.log('redirect to login')
    }
  }

  addQuestion(question) {
    const newDocs = [...this.state.questions]
    const id = question.id
    newDocs.push(id)

    this.setState({
      questions: newDocs
    })
  }

  handleNumOfQuestionsChange(event) {
    const newValue = event.target.value;
    this.setState({
      numOfQuestions:newValue
    })
  }

  createTest() {
    this.setState({
      createTestClicked:true
    })
    const numOfQuestions = this.state.numOfQuestions

    if (numOfQuestions > 0 && numOfQuestions < 136) {
      const shuffled = this.state.questions.sort(() => 0.5 - Math.random());
      const questionsInTest = []
      const selected = shuffled.slice(0, numOfQuestions)

      for (let i = 0; i < selected.length; i++) {
        questionsInTest.push({id:selected[i]})
      }

      const data = {
        questions: questionsInTest,
        id: shortid.generate(),
        course: 'MS-500'
      }
      db.collection("users").doc(this.state.uid).collection('tests').doc(data.id).set(data)
      navigate(`/course/ms-500/test?testid=${data.id}`)
    }

    console.log(numOfQuestions)
  }

  render() {
    const uploadError = ''

    return (
      <Page>
        <main>
          <div>
            <Container>
              <Row>
                <Col><h1>MS-500 Test</h1></Col>
              </Row>
              <Row>
                <Alert variant={'danger'} className={uploadError === '' ? 'display-none' : ''}>
                  <h5>Error Creating Test</h5>
                  <p>{uploadError}</p>
                </Alert>
              </Row>
              <Row>
                <Alert variant={'danger'} className={this.state.createTestClicked === true && (this.state.numOfQuestions > 135 || this.state.numOfQuestions < 1) ? '' : 'display-none'}>
                  <h5>Error with number of questions</h5>
                  <p>Question count must be between 1-135</p>
                </Alert>
              </Row>
              <Row>
                <Col>
                  <Form.Label htmlFor="inputNumber">Number of Questions</Form.Label>
                  <Form.Control
                    type="number"
                    id="inputNumber"
                    aria-describedby="inputNumberHelpBlock"
                    value={this.state.numOfQuestions}
                    onChange={this.handleNumOfQuestionsChange}
                  />
                  <Form.Text id="inputNumberHelpBlock" muted>
                    Must be a number between 1-135
                  </Form.Text>
                </Col>
              </Row>
              <Row>
                <Col xs={10}></Col>
                <Col xs={2} style={alignRightStyles}>
                  <Button onClick={this.createTest}>Create Test</Button>
                </Col>
              </Row>
            </Container>
          </div>
        </main>
      </Page>
    )
  }
}

export default TestsNewPage
