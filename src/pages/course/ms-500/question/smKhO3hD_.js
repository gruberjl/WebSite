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
import firebase from "firebase/app"
import "firebase/firestore"
import draftToHtml from 'draftjs-to-html'
const db = firebase.firestore()

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

    firebase.auth().onAuthStateChanged(this.setUid)

    this.state = {
      questions: {},
      uid: '',
      testId: params.get('testId'),
      test: {},
      question: {"references":{"blocks":[{"entityRanges":[],"key":"4at2l","type":"unstyled","inlineStyleRanges":[],"data":{},"depth":0,"text":"The user sign-ins report provides information on the sign-in pattern of a user, the number of users that have signed in over a week, and the status of these sign- ins."},{"data":{},"entityRanges":[],"type":"unstyled","text":"Note:","inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"depth":0,"key":"ds5vt"},{"key":"36ilt","data":{},"type":"unstyled","text":"There are several versions of this question in the exam. The question has two possible correct answers:","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"data":{},"type":"ordered-list-item","depth":0,"text":"From the Enterprise applications blade of the Azure Active Directory admin center, view the sign-ins.","inlineStyleRanges":[],"key":"fcce4","entityRanges":[]},{"depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{},"key":"54o6n","type":"ordered-list-item","text":"From the Azure Active Directory admin center, view the sign-ins."},{"text":"Other incorrect answer options you may see on the exam include the following:","data":{},"inlineStyleRanges":[],"key":"cqqvv","entityRanges":[],"type":"unstyled","depth":0},{"data":{},"key":"8n50b","type":"ordered-list-item","entityRanges":[],"text":"From Azure Log Analytics, query the logs.","depth":0,"inlineStyleRanges":[]},{"text":"From the Security & Compliance admin center, perform an audit log search.","inlineStyleRanges":[],"entityRanges":[],"data":{},"type":"ordered-list-item","key":"anl57","depth":0},{"depth":0,"text":"Reference:","data":{},"type":"unstyled","entityRanges":[],"key":"ehkfk","inlineStyleRanges":[{"offset":0,"length":9,"style":"BOLD"}]},{"key":"4pavl","type":"unstyled","text":"https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/concept-sign-ins","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}},"question":{"blocks":[{"depth":0,"text":"You have a Microsoft 365 E5 subscription.","data":{},"inlineStyleRanges":[],"key":"f6avo","type":"unstyled","entityRanges":[]},{"type":"unstyled","key":"8qbsp","text":"Some users are required to use an authenticator app to access Microsoft SharePoint Online.","depth":0,"entityRanges":[],"data":{},"inlineStyleRanges":[]},{"depth":0,"type":"unstyled","key":"fb7q","inlineStyleRanges":[],"entityRanges":[],"text":"You need to view which users have used an authenticator app to access SharePoint Online. The solution must minimize costs.","data":{}},{"key":"2adq3","depth":0,"inlineStyleRanges":[],"data":{},"text":"What should you do?","type":"unstyled","entityRanges":[]}],"entityMap":{}},"id":"smKhO3hD_","answers":[{"isCorrectAnswer":true,"value":"From the Azure Active Directory admin center, view the sign-ins."},{"value":"From the Security & Compliance admin center, download a report.","isCorrectAnswer":false},{"value":"From the Enterprise applications blade of the Azure Active Directory admin center, view the audit logs.","isCorrectAnswer":false},{"isCorrectAnswer":false,"value":"From the Azure Active Directory admin center, view the authentication methods."}]},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'smKhO3hD_',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft 365 E5 subscription.</p>
<p>Some users are required to use an authenticator app to access Microsoft SharePoint Online.</p>
<p>You need to view which users have used an authenticator app to access SharePoint Online. The solution must minimize costs.</p>
<p>What should you do?</p>
`,
      referencesHtml: `<p>The user sign-ins report provides information on the sign-in pattern of a user, the number of users that have signed in over a week, and the status of these sign- ins.</p>
<p><strong>Note</strong>:</p>
<p>There are several versions of this question in the exam. The question has two possible correct answers:</p>
<ol>
<li>From the Enterprise applications blade of the Azure Active Directory admin center, view the sign-ins.</li>
<li>From the Azure Active Directory admin center, view the sign-ins.</li>
</ol>
<p>Other incorrect answer options you may see on the exam include the following:</p>
<ol>
<li>From Azure Log Analytics, query the logs.</li>
<li>From the Security &amp; Compliance admin center, perform an audit log search.</li>
</ol>
<p><strong>Reference</strong>:</p>
<p>https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/concept-sign-ins</p>
`,
      selectedAnswer: [],
      answerShown: false,
      questionsShown: false,
      endExamShown: false,
      endExamText: 'Are you sure you want to end the exam?'
    }
  }

  setUid(user) {
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
      console.log('redirect to login')
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
              <Row>
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
