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
      question: {"question":{"blocks":[{"type":"unstyled","key":"957rl","depth":0,"text":"You have a Microsoft 365 E5 subscription that contains an Azure Active Directory (Azure AD) tenant named contoso.com.","inlineStyleRanges":[],"entityRanges":[],"data":{}},{"data":{},"depth":0,"entityRanges":[],"inlineStyleRanges":[],"type":"unstyled","text":"Azure AD Identity Protection alerts for contoso.com are configured as shown in the following exhibit.","key":"8uunj"},{"inlineStyleRanges":[],"text":" ","depth":0,"entityRanges":[{"key":0,"offset":0,"length":1}],"data":{},"key":"d1p7o","type":"atomic"},{"depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{},"type":"unstyled","text":"A user named John Gruber is configured to receive alerts from Azure AD Identity Protection.","key":"deom4"},{"text":"You create users in contoso.com as shown in the following table.","inlineStyleRanges":[],"type":"unstyled","depth":0,"key":"c9k4u","entityRanges":[],"data":{}},{"entityRanges":[{"length":1,"offset":0,"key":1}],"depth":0,"type":"atomic","text":" ","inlineStyleRanges":[],"key":"bd174","data":{}},{"inlineStyleRanges":[],"key":"10fuk","text":"The users perform the sign-ins shown in the following table.For each of the following statements, lc if the statement is true. Otherwise, selehcetc kNboo.","type":"unstyled","entityRanges":[],"data":{},"depth":0},{"type":"unstyled","inlineStyleRanges":[],"depth":0,"entityRanges":[],"text":"For each of the following statements, Click the checkbox if the statement is true. Otherwise, select No.","data":{},"key":"b6q29"}],"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"width":"auto","alt":"Users at Risk screenshot","alignment":"left","src":"https://i.ibb.co/RTNLdyM/Users-At-Risk.png","height":"auto"}},"1":{"mutability":"MUTABLE","type":"IMAGE","data":{"alignment":"left","alt":"User role chart","height":"auto","src":"https://i.ibb.co/wzLBtGJ/user-role-chart.png","width":"auto"}}}},"answers":[{"value":"John Gruber receives 3 email alerts from Azure AD Identity Protection","isCorrectAnswer":false},{"value":"User2 receives 3 email alerts from Azure AD Identity Protection","isCorrectAnswer":false},{"value":"User3 receives 2 email alerts from Azure AD Identity Protection","isCorrectAnswer":false}],"id":"vxLbzynWU","references":{"blocks":[{"key":"b4n82","type":"unstyled","depth":0,"text":"Box 1: No","inlineStyleRanges":[{"length":9,"offset":0,"style":"BOLD"}],"data":{},"entityRanges":[]},{"inlineStyleRanges":[],"depth":0,"entityRanges":[],"data":{},"type":"unstyled","key":"a4q6n","text":"User1 will receive the two alerts classified as medium or higher."},{"type":"unstyled","key":"fnuqh","depth":0,"text":"Sign-ins from infected device is classified as low. This risk detection identifies IP addresses, not user devices. If several devices are behind a single IP address, and only some are controlled by a bot network, sign-ins from other devices my trigger this event unnecessarily, which is why this risk detection is classified as","inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9rl6v","type":"unstyled","data":{},"text":"Low.","entityRanges":[],"depth":0,"inlineStyleRanges":[]},{"data":{},"text":"Box 2: No","key":"fc3ej","type":"unstyled","inlineStyleRanges":[{"length":9,"style":"BOLD","offset":0}],"entityRanges":[],"depth":0},{"entityRanges":[],"key":"3shng","data":{},"text":"User2 will receive the two alerts classified as medium or higher.","inlineStyleRanges":[],"type":"unstyled","depth":0},{"entityRanges":[],"type":"unstyled","key":"81rao","data":{},"depth":0,"text":"Email alerts are sent to all global admins, security admins and security readers","inlineStyleRanges":[]},{"type":"unstyled","inlineStyleRanges":[],"text":"Sign-ins from infected device is classified as low. This risk detection identifies IP addresses, not user devices. If several devices are behind a single IP address, and only some are controlled by a bot network, sign-ins from other devices my trigger this event unnecessarily, which is why this risk detection is classified as","key":"2hg9v","entityRanges":[],"data":{},"depth":0},{"data":{},"inlineStyleRanges":[],"depth":0,"type":"unstyled","key":"4u5fb","text":"Low.","entityRanges":[]},{"data":{},"depth":0,"type":"unstyled","entityRanges":[],"text":"Box 3: No","key":"shoc","inlineStyleRanges":[{"offset":0,"style":"BOLD","length":9}]},{"text":"User3 will not receive alters.","depth":0,"entityRanges":[],"data":{},"key":"9benb","type":"unstyled","inlineStyleRanges":[]},{"inlineStyleRanges":[],"type":"unstyled","key":"f82l0","text":"Email alerts are sent to all global admins, security admins and security readers.","entityRanges":[],"depth":0,"data":{}},{"type":"unstyled","depth":0,"data":{},"key":"49c2a","inlineStyleRanges":[],"entityRanges":[],"text":""},{"depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{},"key":"btri2","type":"unstyled","text":"https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/overview-identity-protection"},{"text":"https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/howto-identity-protection-configure-risk-policies","depth":0,"inlineStyleRanges":[],"key":"6d4nq","type":"unstyled","entityRanges":[],"data":{}}],"entityMap":{}}},
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
