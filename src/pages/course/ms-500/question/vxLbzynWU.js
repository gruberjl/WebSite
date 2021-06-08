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
      question: {"references":{"entityMap":{},"blocks":[{"data":{},"key":"b4n82","inlineStyleRanges":[{"length":9,"offset":0,"style":"BOLD"}],"text":"Box 1: No","entityRanges":[],"depth":0,"type":"unstyled"},{"key":"a4q6n","depth":0,"entityRanges":[],"inlineStyleRanges":[],"text":"User1 will receive the two alerts classified as medium or higher.","data":{},"type":"unstyled"},{"type":"unstyled","inlineStyleRanges":[],"entityRanges":[],"text":"Sign-ins from infected device is classified as low. This risk detection identifies IP addresses, not user devices. If several devices are behind a single IP address, and only some are controlled by a bot network, sign-ins from other devices my trigger this event unnecessarily, which is why this risk detection is classified as","data":{},"key":"fnuqh","depth":0},{"text":"Low.","inlineStyleRanges":[],"entityRanges":[],"key":"9rl6v","depth":0,"data":{},"type":"unstyled"},{"key":"fc3ej","inlineStyleRanges":[{"style":"BOLD","length":9,"offset":0}],"depth":0,"type":"unstyled","text":"Box 2: No","data":{},"entityRanges":[]},{"type":"unstyled","text":"User2 will receive the two alerts classified as medium or higher.","key":"3shng","entityRanges":[],"depth":0,"inlineStyleRanges":[],"data":{}},{"text":"Email alerts are sent to all global admins, security admins and security readers","depth":0,"entityRanges":[],"key":"81rao","type":"unstyled","data":{},"inlineStyleRanges":[]},{"inlineStyleRanges":[],"data":{},"depth":0,"entityRanges":[],"key":"2hg9v","type":"unstyled","text":"Sign-ins from infected device is classified as low. This risk detection identifies IP addresses, not user devices. If several devices are behind a single IP address, and only some are controlled by a bot network, sign-ins from other devices my trigger this event unnecessarily, which is why this risk detection is classified as"},{"inlineStyleRanges":[],"entityRanges":[],"key":"4u5fb","depth":0,"data":{},"type":"unstyled","text":"Low."},{"type":"unstyled","data":{},"text":"Box 3: No","entityRanges":[],"depth":0,"key":"shoc","inlineStyleRanges":[{"style":"BOLD","length":9,"offset":0}]},{"type":"unstyled","depth":0,"text":"User3 will not receive alters.","inlineStyleRanges":[],"data":{},"key":"9benb","entityRanges":[]},{"depth":0,"key":"f82l0","entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"data":{},"text":"Email alerts are sent to all global admins, security admins and security readers."},{"text":"","key":"49c2a","entityRanges":[],"data":{},"depth":0,"inlineStyleRanges":[],"type":"unstyled"},{"data":{},"type":"unstyled","text":"https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/overview-identity-protection","key":"btri2","inlineStyleRanges":[],"entityRanges":[],"depth":0},{"data":{},"depth":0,"text":"https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/howto-identity-protection-configure-risk-policies","key":"6d4nq","entityRanges":[],"type":"unstyled","inlineStyleRanges":[]}]},"id":"vxLbzynWU","answers":[{"value":"John Gruber receives 3 email alerts from Azure AD Identity Protection","isCorrectAnswer":false},{"isCorrectAnswer":false,"value":"User2 receives 3 email alerts from Azure AD Identity Protection"},{"value":"User3 receives 2 email alerts from Azure AD Identity Protection","isCorrectAnswer":false}],"question":{"blocks":[{"data":{},"key":"957rl","entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"text":"You have a Microsoft 365 E5 subscription that contains an Azure Active Directory (Azure AD) tenant named contoso.com.","depth":0},{"inlineStyleRanges":[],"entityRanges":[],"data":{},"key":"8uunj","type":"unstyled","depth":0,"text":"Azure AD Identity Protection alerts for contoso.com are configured as shown in the following exhibit."},{"data":{},"type":"atomic","key":"d1p7o","entityRanges":[{"key":0,"length":1,"offset":0}],"depth":0,"inlineStyleRanges":[],"text":" "},{"type":"unstyled","data":{},"inlineStyleRanges":[],"entityRanges":[],"depth":0,"text":"A user named John Gruber is configured to receive alerts from Azure AD Identity Protection.","key":"deom4"},{"text":"You create users in contoso.com as shown in the following table.","key":"c9k4u","entityRanges":[],"data":{},"depth":0,"inlineStyleRanges":[],"type":"unstyled"},{"entityRanges":[{"length":1,"key":1,"offset":0}],"inlineStyleRanges":[],"key":"bd174","depth":0,"text":" ","data":{},"type":"atomic"},{"entityRanges":[],"key":"10fuk","type":"unstyled","inlineStyleRanges":[],"depth":0,"text":"The users perform the sign-ins shown in the following table.For each of the following statements, lc if the statement is true. Otherwise, selehcetc kNboo.","data":{}},{"type":"unstyled","inlineStyleRanges":[],"depth":0,"text":"For each of the following statements, Click the checkbox if the statement is true. Otherwise, select No.","data":{},"entityRanges":[],"key":"b6q29"}],"entityMap":{"0":{"data":{"src":"https://i.ibb.co/RTNLdyM/Users-At-Risk.png","alignment":"left","alt":"Users at Risk screenshot","width":"auto","height":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"1":{"type":"IMAGE","data":{"alignment":"left","width":"auto","src":"https://i.ibb.co/wzLBtGJ/user-role-chart.png","height":"auto","alt":"User role chart"},"mutability":"MUTABLE"}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'vxLbzynWU',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft 365 E5 subscription that contains an Azure Active Directory (Azure AD) tenant named contoso.com.</p>
<p>Azure AD Identity Protection alerts for contoso.com are configured as shown in the following exhibit.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/RTNLdyM/Users-At-Risk.png" alt="Users at Risk screenshot" style="height: auto;width: auto"/></div>
<p>A user named John Gruber is configured to receive alerts from Azure AD Identity Protection.</p>
<p>You create users in contoso.com as shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/wzLBtGJ/user-role-chart.png" alt="User role chart" style="height: auto;width: auto"/></div>
<p>The users perform the sign-ins shown in the following table.For each of the following statements, lc if the statement is true. Otherwise, selehcetc kNboo.</p>
<p>For each of the following statements, Click the checkbox if the statement is true. Otherwise, select No.</p>
`,
      referencesHtml: `<p><strong>Box 1: No</strong></p>
<p>User1 will receive the two alerts classified as medium or higher.</p>
<p>Sign-ins from infected device is classified as low. This risk detection identifies IP addresses, not user devices. If several devices are behind a single IP address, and only some are controlled by a bot network, sign-ins from other devices my trigger this event unnecessarily, which is why this risk detection is classified as</p>
<p>Low.</p>
<p><strong>Box 2: No</strong></p>
<p>User2 will receive the two alerts classified as medium or higher.</p>
<p>Email alerts are sent to all global admins, security admins and security readers</p>
<p>Sign-ins from infected device is classified as low. This risk detection identifies IP addresses, not user devices. If several devices are behind a single IP address, and only some are controlled by a bot network, sign-ins from other devices my trigger this event unnecessarily, which is why this risk detection is classified as</p>
<p>Low.</p>
<p><strong>Box 3: No</strong></p>
<p>User3 will not receive alters.</p>
<p>Email alerts are sent to all global admins, security admins and security readers.</p>
<p></p>
<p>https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/overview-identity-protection</p>
<p>https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/howto-identity-protection-configure-risk-policies</p>
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
