import * as React from "react"
import Page from '../../../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { Link, navigate } from "gatsby"
import firebase from 'gatsby-plugin-firebase-app'
import draftToHtml from 'draftjs-to-html'


const optionStyles = {
  marginTop: '14px',
  marginBottom: '14px',
  display: 'flex'
}

const checkboxStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const referencesStyle = {
  marginTop: '24px'
}

const bottomButtonStyle = {
  marginTop: '24px'
}

class EditQuestionPage extends React.Component {
  constructor(props) {
    super(props)
    this.setUid = this.setUid.bind(this)
    this.handleCorrectAnswerChange = this.handleCorrectAnswerChange.bind(this)
    this.toggleShowAnswer = this.toggleShowAnswer.bind(this)
    this.toggleShowQuestions = this.toggleShowQuestions.bind(this)
    this.gotoQuestion = this.gotoQuestion.bind(this)
    this.toggleEndExam = this.toggleEndExam.bind(this)
    this.endExam = this.endExam.bind(this)
    const params = new URLSearchParams(props.location.search)

    const isBrowser = () => typeof window !== 'undefined'

    if (isBrowser()) {
      firebase.auth().onAuthStateChanged(this.setUid)
    }

    this.state = {
      questions: {},
      uid: '',
      testId: params.get('testId'),
      test: {},
      question: {"answers":[{"value":"Turn off Delayed updates for the Azure ATP sensors.","isCorrectAnswer":false},{"value":"Configure auditing in the Office 365 Security & Compliance center.","isCorrectAnswer":false},{"value":"Turn on Delayed updates for the Azure ATP sensors.","isCorrectAnswer":false},{"isCorrectAnswer":true,"value":"Integrate SIEM and Azure ATP."}],"id":"L1SBGW44b","question":{"blocks":[{"inlineStyleRanges":[],"entityRanges":[],"key":"9bi1q","depth":0,"data":{},"type":"unstyled","text":"Your network contains an on-premises Active Directory domain. The domain contains servers that run Windows Server and have advanced auditing enabled."},{"type":"unstyled","key":"83ivf","data":{},"text":"The security logs of the servers are collected by using a third-party SIEM solution.","entityRanges":[],"inlineStyleRanges":[],"depth":0},{"key":"7e2p1","depth":0,"inlineStyleRanges":[],"data":{},"text":"You purchase a Microsoft 365 subscription and plan to deploy Azure Advanced Threat Protection (ATP) by using standalone sensors.","entityRanges":[],"type":"unstyled"},{"data":{},"depth":0,"text":"You need to ensure that you can detect when sensitive groups are modified and when malicious services are created.","entityRanges":[],"key":"ckv72","type":"unstyled","inlineStyleRanges":[]},{"key":"5jeqb","entityRanges":[],"text":"What should you do?","type":"unstyled","depth":0,"data":{},"inlineStyleRanges":[]}],"entityMap":{}},"references":{"blocks":[{"entityRanges":[],"depth":0,"key":"5ild6","data":{},"type":"unstyled","text":"There are several versions of this question in the exam. The questions in the exam have two different correct answers:","inlineStyleRanges":[]},{"data":{},"inlineStyleRanges":[],"key":"8soon","text":"1. Integrate SIEM and Azure ATP.","depth":0,"entityRanges":[],"type":"unstyled"},{"entityRanges":[],"data":{},"key":"537gi","depth":0,"text":"2. Configure Event Forwarding on the domain controllers","type":"unstyled","inlineStyleRanges":[]},{"entityRanges":[],"data":{},"depth":0,"text":"Other incorrect answer options you may see on the exam include the following:","key":"afrhk","type":"unstyled","inlineStyleRanges":[]},{"type":"unstyled","text":"1. Configure Azure ATP notifications","entityRanges":[],"depth":0,"key":"42iu7","data":{},"inlineStyleRanges":[]},{"key":"7in4b","text":"2. Modify the Domain synchronizer candidate settings on the Azure ATP sensors","depth":0,"inlineStyleRanges":[],"entityRanges":[],"type":"unstyled","data":{}},{"type":"unstyled","text":"3. Enable the Audit account management Group Policy setting for the servers.","key":"94mm1","data":{},"depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"key":"6vb60","depth":0,"data":{},"entityRanges":[],"inlineStyleRanges":[],"text":"https://docs.microsoft.com/en-us/azure-advanced-threat-protection/configure-event-forwarding","type":"unstyled"}],"entityMap":{}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'L1SBGW44b',
      questionIdx: '',
      questionHtml: `<p>Your network contains an on-premises Active Directory domain. The domain contains servers that run Windows Server and have advanced auditing enabled.</p>
<p>The security logs of the servers are collected by using a third-party SIEM solution.</p>
<p>You purchase a Microsoft 365 subscription and plan to deploy Azure Advanced Threat Protection (ATP) by using standalone sensors.</p>
<p>You need to ensure that you can detect when sensitive groups are modified and when malicious services are created.</p>
<p>What should you do?</p>
`,
      referencesHtml: `<p>There are several versions of this question in the exam. The questions in the exam have two different correct answers:</p>
<p>1. Integrate SIEM and Azure ATP.</p>
<p>2. Configure Event Forwarding on the domain controllers</p>
<p>Other incorrect answer options you may see on the exam include the following:</p>
<p>1. Configure Azure ATP notifications</p>
<p>2. Modify the Domain synchronizer candidate settings on the Azure ATP sensors</p>
<p>3. Enable the Audit account management Group Policy setting for the servers.</p>
<p>https://docs.microsoft.com/en-us/azure-advanced-threat-protection/configure-event-forwarding</p>
`,
      selectedAnswer: [],
      answerShown: false,
      questionsShown: false,
      endExamShown: false,
      endExamText: 'Are you sure you want to end the exam?'
    }
  }

  setUid(user) {
    const db = firebase.firestore()
    if (user) {
      this.setState({
        uid: user.uid
      })

      db.collection("users").doc(this.state.uid).collection('tests').doc(this.state.testId).get().then(doc => {
        const test = doc.data()
        test.id = doc.id
        let previousQuestionId = ''
        let nextQuestionId = ''
        let currentQuestion
        let previousItm
        let foundQuestion = false
        let questionIdx
        let selectedAnswer = this.state.selectedAnswer

        test.questions.forEach((question, idx) => {
          if (foundQuestion) {
              nextQuestionId = question.id
              foundQuestion = false
          }

          if (this.state.questionId === question.id) {
            foundQuestion = true
            currentQuestion = question
            questionIdx = idx+1
            if (previousItm)
              previousQuestionId = previousItm.id

            if (currentQuestion.answered)
              selectedAnswer = currentQuestion.answered
          }

          previousItm = question
        })

        db.collection('Tests').doc('MS-500').collection('Questions').doc(currentQuestion.id).get().then(doc => {
          const question = doc.data()
          question.id = doc.id
          const questionHtml = draftToHtml(question.question)
          const referencesHtml = draftToHtml(question.references)
          this.setState({question, questionHtml, referencesHtml})
        })

        this.setState({
          test,
          questionIdx: questionIdx,
          nextQuestionId: nextQuestionId,
          previousQuestionId: previousQuestionId,
          selectedAnswer
        })
      })
    } else {
      navigate("/login")
    }
  }

  handleCorrectAnswerChange(event) {
    const idx = event.target.dataset.index
    const target = event.target
    const selectedAnswer = [...this.state.selectedAnswer]

    if (target.checked) {
      selectedAnswer.push(idx)
    } else {
      const index = selectedAnswer.indexOf(`${idx}`)
      selectedAnswer.splice(index, 1)
    }

    this.setState({selectedAnswer})

    const test = Object.assign({}, this.state.test)

    test.questions = test.questions.map(question => {
      if (question.id === this.state.questionId) {
        question.answered = selectedAnswer
      }
      return question
    })

    const db = firebase.firestore()
    db.collection("users").doc(this.state.uid).collection('tests').doc(test.id).set(test)

    this.setState({test})
  }

  toggleShowAnswer() {
    const answerShown = !this.state.answerShown
    this.setState({answerShown})
  }

  toggleShowQuestions() {
    const questionsShown = !this.state.questionsShown
    this.setState({questionsShown})
  }

  toggleEndExam() {
    const endExamShown = !this.state.endExamShown
    this.setState({endExamShown})
  }

  gotoQuestion(questionId) {
    return () => {
      navigate(`/course/ms-500/question/${questionId}?testId=${this.state.testId}`)
    }
  }

  endExam() {
    const test = this.state.test
    test.isComplete = true
    const db = firebase.firestore()
    db.collection("users").doc(this.state.uid).collection('tests').doc(test.id).set(test).then(() => {
      navigate(`/tests/summary?testId=${this.state.testId}`)
    })
  }

  render() {
    let answers = this.state.question.answers ? this.state.question.answers : []

    answers = [...answers].map((answer, index) => {
      answer.isSelected = this.state.selectedAnswer.includes(`${index}`)
      answer.optionStyles = Object.assign({}, optionStyles)
      if (this.state.answerShown && answer.isCorrectAnswer) {
        answer.optionStyles.background = 'green'
      }

      return answer
    })

    return (
      <Page>
        <main>
          <div>
            <Container>
              <Row>
                <Col md={8}><h1>Question {this.state.questionIdx}</h1></Col>
                <Col md={2} className='align-right'> {
                  this.state.previousQuestionId !== '' ?
                    <Button as={Link} to={`/course/ms-500/question/${this.state.previousQuestionId}?testId=${this.state.testId}`}>Previous Question</Button> :
                    ''
                  }
                </Col>
                <Col md={2} className='align-right'>{
                  this.state.nextQuestionId !== '' ?
                    <Button as={Link} to={`/course/ms-500/question/${this.state.nextQuestionId}?testId=${this.state.testId}`}>Next Question</Button> :
                    <Button onClick={this.toggleEndExam} variant="warning">End Exam</Button>
                  }
                </Col>
              </Row>
              <Row className="img-width-100">
                { this.state.questionHtml !== '' ?
                  <div dangerouslySetInnerHTML={{__html: this.state.questionHtml}}></div>
                  : ''
                }
              </Row>
              <Row>
                {answers.map((answerState, index) => {
                  return (
                    <div style={answerState.optionStyles} key={index}>
                      <Form.Check type="checkbox" name={"AnswerCheck" + index} id={"AnswerCheck" + index} data-index={index} inline style={checkboxStyles} checked={this.state.selectedAnswer.includes(`${index}`)} onChange={this.handleCorrectAnswerChange} />
                      <label htmlFor={"AnswerCheck" + index}>{answerState.value}</label>
                    </div>
                  )
                })}
              </Row>
              <Row>
                <Col>
                  { this.state.answerShown ?
                    <div style={referencesStyle} dangerouslySetInnerHTML={{__html: this.state.referencesHtml}}></div> :
                    ''
                  }
                </Col>
              </Row>
              <Row className='align-right'>
                <Col md={8}></Col>
                <Col md={2}> {
                  this.state.previousQuestionId !== '' ?
                    <Button as={Link} to={`/course/ms-500/question/${this.state.previousQuestionId}?testId=${this.state.testId}`}>Previous Question</Button> :
                    ''
                  }
                </Col>
                <Col md={2}>{
                  this.state.nextQuestionId !== '' ?
                    <Button as={Link} to={`/course/ms-500/question/${this.state.nextQuestionId}?testId=${this.state.testId}`}>Next Question</Button> :
                    <Button onClick={this.toggleEndExam} variant="warning">End Exam</Button>
                  }
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Button onClick={this.toggleShowAnswer} style={bottomButtonStyle}>
                    { this.state.answerShown ?
                      <span>Hide Answer</span> :
                      <span>Show Answer</span>
                    }
                  </Button>
                </Col>
                <Col xs={12} md={6} className='align-right'>
                  <Button onClick={this.toggleShowQuestions} style={bottomButtonStyle}>
                    { this.state.questionsShown ?
                      <span>Hide Question List</span> :
                      <span>Show Question List</span>
                    }
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col className='align-right'>
                  <Button onClick={this.toggleEndExam} variant="warning" style={bottomButtonStyle}>End Exam</Button>
                </Col>
              </Row>
            </Container>
          </div>

          <Modal show={this.state.questionsShown} onHide={this.toggleShowQuestions}>
            <Modal.Header>
              <Modal.Title>Showing Test Questions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Answer</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.test && this.state.test.questions ? this.state.test.questions.map((question, idx) => (
                    <tr key={idx} onClick={this.gotoQuestion(question.id)} className="cursor-pointer">
                      <td>{idx+1}</td>
                      <td>{question.answered}</td>
                    </tr>
                  )) : '' }
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.toggleShowQuestions}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.endExamShown} onHide={this.toggleEndExam}>
            <Modal.Header>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              { this.state.endExamText }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.endExam}>
                Yes
              </Button>
              <Button variant="secondary" onClick={this.toggleEndExam}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </main>
      </Page>
    )
  }
}

export default EditQuestionPage
