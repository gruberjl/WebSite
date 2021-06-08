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
      question: {"answers":[{"value":"User1 must change their password","isCorrectAnswer":true},{"value":"User2 must change their password","isCorrectAnswer":false},{"value":"User3 must change their password","isCorrectAnswer":false}],"question":{"blocks":[{"depth":0,"key":"9gu7q","inlineStyleRanges":[],"data":{},"text":"You have a Microsoft 365 subscription that contains the users shown in the following table.","entityRanges":[],"type":"unstyled"},{"key":"99lev","type":"atomic","depth":0,"entityRanges":[{"length":1,"offset":0,"key":0}],"data":{},"inlineStyleRanges":[],"text":" "},{"entityRanges":[],"key":"dv9re","type":"unstyled","text":"You create and enforce an Azure Active Directory (Azure AD) Identity Protection sign-in risk policy that has the following settings:","depth":0,"data":{},"inlineStyleRanges":[]},{"inlineStyleRanges":[],"key":"6455m","entityRanges":[],"type":"unordered-list-item","data":{},"depth":0,"text":"Assignments: Include Group1, Exclude Group2"},{"depth":0,"text":"Conditions: User risk level of Medium and above","type":"unordered-list-item","entityRanges":[],"key":"2dqp1","inlineStyleRanges":[],"data":{}},{"entityRanges":[],"type":"unordered-list-item","text":"Access: Allow access, Require password change","depth":0,"key":"9psfk","data":{},"inlineStyleRanges":[]},{"key":"d3chi","data":{},"depth":0,"inlineStyleRanges":[],"text":"The users attempt to sign in. The risk level for each user is shown in the following table.","type":"unstyled","entityRanges":[]},{"inlineStyleRanges":[],"key":"5naop","type":"atomic","data":{},"depth":0,"entityRanges":[{"key":1,"length":1,"offset":0}],"text":" "},{"data":{},"key":"38vb7","type":"unstyled","entityRanges":[],"inlineStyleRanges":[],"text":"For each of the following statements, check the box if the answer is true. Otherwise, leave it unchecked.","depth":0},{"depth":0,"inlineStyleRanges":[],"text":"NOTE: Each correct selection is worth one point.","data":{},"entityRanges":[],"key":"4crq3","type":"unstyled"}],"entityMap":{"0":{"mutability":"MUTABLE","type":"IMAGE","data":{"height":"auto","width":"auto","alignment":"left","alt":"Chart showing users and groups","src":"https://i.ibb.co/WVjQP2K/chart7.png"}},"1":{"data":{"alignment":"left","height":"auto","src":"https://i.ibb.co/LxsWp5S/Chart8.png","alt":"Chart showing user risk level","width":"auto"},"mutability":"MUTABLE","type":"IMAGE"}}},"references":{"entityMap":{},"blocks":[{"type":"unstyled","data":{},"inlineStyleRanges":[{"length":10,"offset":0,"style":"BOLD"}],"depth":0,"entityRanges":[],"key":"44apb","text":"Box 1: Yes"},{"key":"192u7","data":{},"inlineStyleRanges":[],"text":"User1 is in Group1 which the policy applies to.","entityRanges":[],"type":"unstyled","depth":0},{"depth":0,"type":"unstyled","entityRanges":[],"text":"Box 2: No","data":{},"key":"8vpnm","inlineStyleRanges":[{"offset":0,"style":"BOLD","length":9}]},{"key":"48tc0","inlineStyleRanges":[],"entityRanges":[],"data":{},"depth":0,"type":"unstyled","text":"User2 is in Group2 which is excluded from the policy."},{"data":{},"inlineStyleRanges":[{"style":"BOLD","offset":0,"length":9}],"key":"17c30","depth":0,"entityRanges":[],"type":"unstyled","text":"Box 3: No"},{"entityRanges":[],"key":"97snb","type":"unstyled","text":"User3 is in Group1 which is included in the policy and Group2 which is excluded from the policy. In this case, the exclusion wins so the policy does not apply to","data":{},"inlineStyleRanges":[],"depth":0},{"key":"eeq3s","inlineStyleRanges":[],"data":{},"type":"unstyled","entityRanges":[],"depth":0,"text":"User3."}]},"id":"DCx8K1f29"},
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
