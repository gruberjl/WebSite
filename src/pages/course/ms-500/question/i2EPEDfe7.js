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
      question: {"references":{"blocks":[{"entityRanges":[],"inlineStyleRanges":[],"key":"jsce","type":"unstyled","text":"","data":{},"depth":0}],"entityMap":{}},"question":{"blocks":[{"data":{},"text":"You have a Microsoft 365 subscription that contains the users shown in the following table.","key":"2u085","type":"unstyled","entityRanges":[],"depth":0,"inlineStyleRanges":[]},{"entityRanges":[{"key":0,"length":1,"offset":0}],"type":"atomic","data":{},"text":" ","depth":0,"inlineStyleRanges":[],"key":"7nj32"},{"key":"q8g8","entityRanges":[],"depth":0,"data":{},"inlineStyleRanges":[],"type":"unstyled","text":"You implement Azure Active Directory (Azure AD) Privileged Identity Management (PIM)."},{"entityRanges":[],"key":"9t9i0","inlineStyleRanges":[],"data":{},"text":"From PIM, you review the Application Administrator role and discover the users shown in the following table.","depth":0,"type":"unstyled"},{"depth":0,"text":" ","key":"4e1ch","type":"atomic","data":{},"inlineStyleRanges":[],"entityRanges":[{"offset":0,"key":1,"length":1}]},{"inlineStyleRanges":[],"entityRanges":[],"key":"dqtr5","data":{},"text":"The Application Administrator role is configured to use the following settings in PIM:","type":"unstyled","depth":0},{"type":"unordered-list-item","data":{},"entityRanges":[],"depth":0,"key":"fs7s9","inlineStyleRanges":[],"text":"Maximum activation duration: 1 hour"},{"inlineStyleRanges":[],"depth":0,"type":"unordered-list-item","data":{},"entityRanges":[],"key":"ciuft","text":"Notifications: Disable"},{"entityRanges":[],"type":"unordered-list-item","inlineStyleRanges":[],"data":{},"depth":0,"key":"95k91","text":"Incident/Request ticket: Disable"},{"entityRanges":[],"data":{},"type":"unordered-list-item","key":"81cbp","text":"Multi-Factor Authentication: Disable","depth":0,"inlineStyleRanges":[]},{"data":{},"key":"91o23","entityRanges":[],"text":"Require approval: Enable","depth":0,"type":"unordered-list-item","inlineStyleRanges":[]},{"text":"Selected approver: No results","type":"unordered-list-item","key":"aqgof","depth":0,"entityRanges":[],"inlineStyleRanges":[],"data":{}},{"depth":0,"inlineStyleRanges":[],"text":"Check the box next to each of the following statements if the statement is true.","entityRanges":[],"type":"unstyled","key":"bpudn","data":{}},{"type":"unstyled","entityRanges":[],"key":"eahgs","inlineStyleRanges":[],"depth":0,"data":{},"text":"NOTE: Each correct selection is worth one point."}],"entityMap":{"0":{"mutability":"MUTABLE","type":"IMAGE","data":{"alignment":"left","alt":"Name Role Chart","src":"https://i.ibb.co/Cs1cMM8/Chart5.png","width":"auto","height":"auto"}},"1":{"mutability":"MUTABLE","type":"IMAGE","data":{"alt":"Name Assignment Type Chart","alignment":"left","width":"auto","height":"auto","src":"https://i.ibb.co/FVBbzdZ/Chart6.png"}}}},"answers":[{"isCorrectAnswer":true,"value":"If UserB requests the Application Administrator role, User1 can approve the request of UserB."},{"isCorrectAnswer":true,"value":"If UserB requests the Application Administrator role, User2 can approve the request of UserB."},{"value":"If UserC requests the Application Administrator role, User3 can approve the request of UserC.","isCorrectAnswer":false}],"id":"i2EPEDfe7"},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'i2EPEDfe7',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft 365 subscription that contains the users shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/Cs1cMM8/Chart5.png" alt="Name Role Chart" style="height: auto;width: auto"/></div>
<p>You implement Azure Active Directory (Azure AD) Privileged Identity Management (PIM).</p>
<p>From PIM, you review the Application Administrator role and discover the users shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/FVBbzdZ/Chart6.png" alt="Name Assignment Type Chart" style="height: auto;width: auto"/></div>
<p>The Application Administrator role is configured to use the following settings in PIM:</p>
<ul>
<li>Maximum activation duration: 1 hour</li>
<li>Notifications: Disable</li>
<li>Incident/Request ticket: Disable</li>
<li>Multi-Factor Authentication: Disable</li>
<li>Require approval: Enable</li>
<li>Selected approver: No results</li>
</ul>
<p>Check the box next to each of the following statements if the statement is true.</p>
<p>NOTE: Each correct selection is worth one point.</p>
`,
      referencesHtml: `<p></p>
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
