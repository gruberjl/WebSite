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
      question: {"answers":[{"isCorrectAnswer":false,"value":"Change the Assignment Type for Admin2 to Permanent"},{"value":"From the Azure Active Directory admin center, assign the Exchange administrator role to Admin2","isCorrectAnswer":false},{"isCorrectAnswer":false,"value":"From the Azure Active Directory admin center, remove the Exchange administrator role to Admin1"},{"isCorrectAnswer":true,"value":"Change the Assignment Type for Admin1 to Eligible"}],"question":{"blocks":[{"depth":0,"key":"376vd","data":{},"entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"text":"Fabrikam identifies the following security requirements:"},{"entityRanges":[],"type":"unstyled","key":"5f2ru","inlineStyleRanges":[],"text":"Access to the Azure Active Directory admin center by the user administrators must be reviewed every seven days. If an administrator fails to respond to an access request within three days, access must be removed","depth":0,"data":{}},{"data":{},"type":"unstyled","key":"aed28","depth":0,"entityRanges":[],"text":"Users who manage Microsoft 365 workloads must only be allowed to perform administrative tasks for up to three hours at a time. Global administrators must be exempt from this requirement","inlineStyleRanges":[]},{"depth":0,"data":{},"entityRanges":[],"inlineStyleRanges":[],"text":"Users must be prevented from inviting external users to view company data. Only global administrators and a user named User1 must be able to send invitations","type":"unstyled","key":"c6tie"},{"type":"unstyled","entityRanges":[],"data":{},"inlineStyleRanges":[],"depth":0,"key":"992ab","text":"Azure Advanced Threat Protection (ATP) must capture security group modifications for sensitive groups, such as Domain Admins in Active Directory"},{"data":{},"entityRanges":[],"inlineStyleRanges":[],"type":"unstyled","text":"Workload administrators must use multi-factor authentication (MFA) when signing in from an anonymous or an unfamiliar location","key":"9cdtf","depth":0},{"inlineStyleRanges":[],"data":{},"text":"The location of the user administrators must be audited when the administrators authenticate to Azure AD","type":"unstyled","entityRanges":[],"depth":0,"key":"17bn8"},{"key":"flaee","data":{},"type":"unstyled","inlineStyleRanges":[],"entityRanges":[],"depth":0,"text":"Email messages that include attachments containing malware must be delivered without the attachment"},{"text":"The principle of least privilege must be used whenever possible","type":"unstyled","inlineStyleRanges":[],"entityRanges":[],"data":{},"key":"4habl","depth":0},{"key":"stm8","data":{},"inlineStyleRanges":[],"type":"unstyled","text":"An administrator configures Azure AD Privileged Identity Management as shown in the following exhibit.","entityRanges":[],"depth":0},{"data":{},"type":"atomic","depth":0,"inlineStyleRanges":[],"text":" ","entityRanges":[{"length":1,"offset":0,"key":0}],"key":"1b5s7"},{"data":{},"depth":0,"key":"a2q2u","inlineStyleRanges":[],"type":"unstyled","text":"","entityRanges":[]},{"key":"14f2n","depth":0,"inlineStyleRanges":[],"type":"atomic","text":" ","entityRanges":[{"key":1,"offset":0,"length":1}],"data":{}},{"inlineStyleRanges":[],"depth":0,"text":"What should you do to meet the security requirements?","data":{},"entityRanges":[],"type":"unstyled","key":"dsva5"}],"entityMap":{"0":{"type":"IMAGE","data":{"width":"auto","height":"auto","alt":"Active Assignments","src":"https://i.ibb.co/5cPfF5D/Active-Assignments.png","alignment":"left"},"mutability":"MUTABLE"},"1":{"mutability":"MUTABLE","data":{"alignment":"left","width":"auto","alt":"Eligible Assignments","height":"auto","src":"https://i.ibb.co/N609WF4/Eligible-Assignments.png"},"type":"IMAGE"}}},"references":{"blocks":[{"entityRanges":[],"text":"","data":{},"inlineStyleRanges":[],"type":"unstyled","depth":0,"key":"dctl8"}],"entityMap":{}},"id":"8HIVdM93U"},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: '8HIVdM93U',
      questionIdx: '',
      questionHtml: `<p>Fabrikam identifies the following security requirements:</p>
<p>Access to the Azure Active Directory admin center by the user administrators must be reviewed every seven days. If an administrator fails to respond to an access request within three days, access must be removed</p>
<p>Users who manage Microsoft 365 workloads must only be allowed to perform administrative tasks for up to three hours at a time. Global administrators must be exempt from this requirement</p>
<p>Users must be prevented from inviting external users to view company data. Only global administrators and a user named User1 must be able to send invitations</p>
<p>Azure Advanced Threat Protection (ATP) must capture security group modifications for sensitive groups, such as Domain Admins in Active Directory</p>
<p>Workload administrators must use multi-factor authentication (MFA) when signing in from an anonymous or an unfamiliar location</p>
<p>The location of the user administrators must be audited when the administrators authenticate to Azure AD</p>
<p>Email messages that include attachments containing malware must be delivered without the attachment</p>
<p>The principle of least privilege must be used whenever possible</p>
<p>An administrator configures Azure AD Privileged Identity Management as shown in the following exhibit.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/5cPfF5D/Active-Assignments.png" alt="Active Assignments" style="height: auto;width: auto"/></div>
<p></p>
<div style="text-align:left;"><img src="https://i.ibb.co/N609WF4/Eligible-Assignments.png" alt="Eligible Assignments" style="height: auto;width: auto"/></div>
<p>What should you do to meet the security requirements?</p>
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
