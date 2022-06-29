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
import {onAuthStateChanged, saveDoc, getAllDocs} from '../../components/firebase'

const alignRightStyles = {
  textAlign: 'right'
}

const isBrowser = () => typeof window !== 'undefined'

export default class TestsNewPage extends React.Component {
  constructor(props) {
    super(props)
    this.addQuestions = this.addQuestions.bind(this)
    this.handleNumOfQuestionsChange = this.handleNumOfQuestionsChange.bind(this)
    this.createTest = this.createTest.bind(this)
    this.setUid = this.setUid.bind(this)

    this.state = {
      numOfQuestions: 60,
      createTestClicked: false,
      questions: [],
      uid: ''
    }
  }
 
  componentDidMount() {
    if (isBrowser()) {
      this.onAuthStateChangedListener = onAuthStateChanged(this.setUid)
      getAllDocs(`Tests/MS-500/Questions`).then(this.addQuestions)
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
    } else {
      navigate("/login")
    }
  }

  addQuestions(docs) {
    this.setState({
      questions: docs
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

    if (numOfQuestions > 0 && numOfQuestions <= this.state.questions.length) {
      const shuffled = this.state.questions.sort(() => 0.5 - Math.random());
      const questionsInTest = []
      const selected = shuffled.slice(0, numOfQuestions)

      for (let i = 0; i < selected.length; i++) {
        questionsInTest.push(selected[i])
      }

      const data = {
        questions: questionsInTest,
        id: shortid.generate(),
        course: 'MS-500'
      }

      saveDoc(`users/${this.state.uid}/tests`, data)

      navigate(`/course/ms-500/test?testid=${data.id}`)
    }
  }

  render() {
    const uploadError = ''

    return (
      <Page title={'Create a practice test'} description={'Create a practice test to help you prepare for the Microsoft 365 MS-500 exam'}>
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
                <Alert variant={'danger'} className={this.state.createTestClicked === true && (this.state.numOfQuestions > this.state.questions.length || this.state.numOfQuestions < 1) ? '' : 'display-none'}>
                  <h5>Error with number of questions</h5>
                  <p>Question count must be between 1-{this.state.questions.length}</p>
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
                    Must be a number between 1-{this.state.questions.length}
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
