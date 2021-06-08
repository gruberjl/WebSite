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
      question: {"answers":[{"value":"From Device1, User1 can copy data from App1 to App3","isCorrectAnswer":false},{"value":"From Device2, User1 can copy data from App1 to App2","isCorrectAnswer":true},{"value":"From Device2, User1 can copy data from App1 to App3","isCorrectAnswer":true}],"id":"kFwtQkqEy","references":{"blocks":[{"data":{},"type":"unstyled","key":"copgf","inlineStyleRanges":[],"text":"","depth":0,"entityRanges":[]}],"entityMap":{}},"question":{"blocks":[{"data":{},"entityRanges":[],"key":"1jrtu","text":"You have a Microsoft 365 subscription that uses a default domain name of contoso.com.","depth":0,"inlineStyleRanges":[],"type":"unstyled"},{"entityRanges":[],"depth":0,"data":{},"type":"unstyled","text":"Microsoft Azure Active Directory (Azure AD) contains the users shown in the following table.","inlineStyleRanges":[],"key":"2p5f2"},{"text":" ","entityRanges":[{"key":0,"length":1,"offset":0}],"key":"5mpad","type":"atomic","inlineStyleRanges":[],"depth":0,"data":{}},{"key":"abq0p","data":{},"text":"Microsoft Endpoint Manager has two devices enrolled as shown in the following table:","depth":0,"inlineStyleRanges":[],"type":"unstyled","entityRanges":[]},{"inlineStyleRanges":[],"type":"atomic","key":"55lm4","depth":0,"text":" ","entityRanges":[{"length":1,"offset":0,"key":1}],"data":{}},{"text":"Both devices have three apps named App1, App2, and App3 installed.","data":{},"depth":0,"entityRanges":[],"type":"unstyled","key":"doaun","inlineStyleRanges":[]},{"entityRanges":[],"inlineStyleRanges":[],"text":"You create an app protection policy named ProtectionPolicy1 that has the following settings:","key":"4p6gt","data":{},"depth":0,"type":"unstyled"},{"key":"5betb","entityRanges":[],"depth":0,"inlineStyleRanges":[],"text":"Protected apps: App1","type":"unordered-list-item","data":{}},{"key":"ai8uj","depth":0,"inlineStyleRanges":[],"text":"Exempt apps: App2","data":{},"entityRanges":[],"type":"unordered-list-item"},{"data":{},"key":"2mjj5","depth":0,"inlineStyleRanges":[],"text":"Windows Information Protection mode: Block","type":"unordered-list-item","entityRanges":[]},{"entityRanges":[],"depth":0,"key":"bnbu5","text":"You apply ProtectionPolicy1 to Group1 and Group3. You exclude Group2 from ProtectionPolicy1.","type":"unstyled","data":{},"inlineStyleRanges":[]},{"inlineStyleRanges":[],"data":{},"type":"unstyled","depth":0,"text":"For each of the following statements, check the box if the statement is true.","entityRanges":[],"key":"1u2nf"}],"entityMap":{"0":{"mutability":"MUTABLE","type":"IMAGE","data":{"width":"auto","alignment":"left","src":"https://i.ibb.co/KxwDstM/user-group.png","height":"auto","alt":"User Group membership chart"}},"1":{"mutability":"MUTABLE","data":{"alignment":"left","alt":"Device chart","src":"https://i.ibb.co/c6d1kCM/device-chart.png","width":"auto","height":"auto"},"type":"IMAGE"}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'kFwtQkqEy',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft 365 subscription that uses a default domain name of contoso.com.</p>
<p>Microsoft Azure Active Directory (Azure AD) contains the users shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/KxwDstM/user-group.png" alt="User Group membership chart" style="height: auto;width: auto"/></div>
<p>Microsoft Endpoint Manager has two devices enrolled as shown in the following table:</p>
<div style="text-align:left;"><img src="https://i.ibb.co/c6d1kCM/device-chart.png" alt="Device chart" style="height: auto;width: auto"/></div>
<p>Both devices have three apps named App1, App2, and App3 installed.</p>
<p>You create an app protection policy named ProtectionPolicy1 that has the following settings:</p>
<ul>
<li>Protected apps: App1</li>
<li>Exempt apps: App2</li>
<li>Windows Information Protection mode: Block</li>
</ul>
<p>You apply ProtectionPolicy1 to Group1 and Group3. You exclude Group2 from ProtectionPolicy1.</p>
<p>For each of the following statements, check the box if the statement is true.</p>
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
