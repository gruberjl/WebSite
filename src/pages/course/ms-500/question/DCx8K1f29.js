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
      question: {"id":"DCx8K1f29","answers":[{"value":"User1 must change their password","isCorrectAnswer":true},{"isCorrectAnswer":false,"value":"User2 must change their password"},{"value":"User3 must change their password","isCorrectAnswer":false}],"references":{"entityMap":{},"blocks":[{"entityRanges":[],"type":"unstyled","data":{},"depth":0,"key":"44apb","inlineStyleRanges":[{"style":"BOLD","length":10,"offset":0}],"text":"Box 1: Yes"},{"type":"unstyled","text":"User1 is in Group1 which the policy applies to.","entityRanges":[],"depth":0,"inlineStyleRanges":[],"key":"192u7","data":{}},{"entityRanges":[],"inlineStyleRanges":[{"length":9,"offset":0,"style":"BOLD"}],"depth":0,"data":{},"type":"unstyled","text":"Box 2: No","key":"8vpnm"},{"entityRanges":[],"data":{},"type":"unstyled","depth":0,"inlineStyleRanges":[],"text":"User2 is in Group2 which is excluded from the policy.","key":"48tc0"},{"entityRanges":[],"inlineStyleRanges":[{"style":"BOLD","length":9,"offset":0}],"data":{},"type":"unstyled","depth":0,"text":"Box 3: No","key":"17c30"},{"key":"97snb","text":"User3 is in Group1 which is included in the policy and Group2 which is excluded from the policy. In this case, the exclusion wins so the policy does not apply to","data":{},"entityRanges":[],"inlineStyleRanges":[],"depth":0,"type":"unstyled"},{"type":"unstyled","inlineStyleRanges":[],"data":{},"key":"eeq3s","entityRanges":[],"text":"User3.","depth":0}]},"question":{"blocks":[{"text":"You have a Microsoft 365 subscription that contains the users shown in the following table.","entityRanges":[],"key":"9gu7q","data":{},"depth":0,"type":"unstyled","inlineStyleRanges":[]},{"data":{},"key":"99lev","entityRanges":[{"offset":0,"key":0,"length":1}],"type":"atomic","depth":0,"inlineStyleRanges":[],"text":" "},{"inlineStyleRanges":[],"text":"You create and enforce an Azure Active Directory (Azure AD) Identity Protection sign-in risk policy that has the following settings:","entityRanges":[],"data":{},"key":"dv9re","type":"unstyled","depth":0},{"key":"6455m","data":{},"type":"unordered-list-item","inlineStyleRanges":[],"text":"Assignments: Include Group1, Exclude Group2","depth":0,"entityRanges":[]},{"text":"Conditions: User risk level of Medium and above","data":{},"entityRanges":[],"inlineStyleRanges":[],"type":"unordered-list-item","depth":0,"key":"2dqp1"},{"type":"unordered-list-item","key":"9psfk","depth":0,"text":"Access: Allow access, Require password change","entityRanges":[],"data":{},"inlineStyleRanges":[]},{"depth":0,"entityRanges":[],"inlineStyleRanges":[],"text":"The users attempt to sign in. The risk level for each user is shown in the following table.","type":"unstyled","key":"d3chi","data":{}},{"depth":0,"inlineStyleRanges":[],"key":"5naop","text":" ","data":{},"entityRanges":[{"key":1,"length":1,"offset":0}],"type":"atomic"},{"entityRanges":[],"data":{},"key":"38vb7","type":"unstyled","text":"For each of the following statements, check the box if the answer is true. Otherwise, leave it unchecked.","inlineStyleRanges":[],"depth":0},{"depth":0,"text":"NOTE: Each correct selection is worth one point.","type":"unstyled","inlineStyleRanges":[],"data":{},"key":"4crq3","entityRanges":[]}],"entityMap":{"0":{"mutability":"MUTABLE","data":{"height":"auto","alignment":"left","width":"auto","src":"https://i.ibb.co/WVjQP2K/chart7.png","alt":"Chart showing users and groups"},"type":"IMAGE"},"1":{"type":"IMAGE","data":{"alt":"Chart showing user risk level","height":"auto","alignment":"left","width":"auto","src":"https://i.ibb.co/LxsWp5S/Chart8.png"},"mutability":"MUTABLE"}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'DCx8K1f29',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft 365 subscription that contains the users shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/WVjQP2K/chart7.png" alt="Chart showing users and groups" style="height: auto;width: auto"/></div>
<p>You create and enforce an Azure Active Directory (Azure AD) Identity Protection sign-in risk policy that has the following settings:</p>
<ul>
<li>Assignments: Include Group1, Exclude Group2</li>
<li>Conditions: User risk level of Medium and above</li>
<li>Access: Allow access, Require password change</li>
</ul>
<p>The users attempt to sign in. The risk level for each user is shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/LxsWp5S/Chart8.png" alt="Chart showing user risk level" style="height: auto;width: auto"/></div>
<p>For each of the following statements, check the box if the answer is true. Otherwise, leave it unchecked.</p>
<p>NOTE: Each correct selection is worth one point.</p>
`,
      referencesHtml: `<p><strong>Box 1: Yes</strong></p>
<p>User1 is in Group1 which the policy applies to.</p>
<p><strong>Box 2: No</strong></p>
<p>User2 is in Group2 which is excluded from the policy.</p>
<p><strong>Box 3: No</strong></p>
<p>User3 is in Group1 which is included in the policy and Group2 which is excluded from the policy. In this case, the exclusion wins so the policy does not apply to</p>
<p>User3.</p>
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
