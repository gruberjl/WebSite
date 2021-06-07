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
      question: {"question":{"blocks":[{"depth":0,"entityRanges":[],"inlineStyleRanges":[],"text":"SIMULATION -","data":{},"type":"unstyled","key":"d3cc3"},{"data":{},"type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"key":"fc5am","text":"You need to protect against phishing attacks. The solution must meet the following requirements:"},{"key":"93hsr","depth":0,"text":"Phishing email messages must be quarantined if the messages are sent from a spoofed domain.","type":"unordered-list-item","data":{},"inlineStyleRanges":[],"entityRanges":[]},{"type":"unordered-list-item","entityRanges":[],"data":{},"text":"As many phishing email messages as possible must be identified.","depth":0,"key":"88pl3","inlineStyleRanges":[]},{"type":"unstyled","inlineStyleRanges":[],"entityRanges":[],"data":{},"depth":0,"key":"3hl1m","text":"The solution must apply to the current SMTP domain names and any domain names added later."},{"key":"41bh9","data":{},"entityRanges":[],"depth":0,"inlineStyleRanges":[],"type":"unstyled","text":"To complete this task, sign in to the Microsoft 365 admin center."}],"entityMap":{}},"id":"1ZxHIf1rT","answers":[{"value":"In the Microsoft 365 admin center enable threat management.","isCorrectAnswer":false},{"value":"In the Exchange Admin center create a mail flow rule to block phishing attempts","isCorrectAnswer":false},{"isCorrectAnswer":true,"value":"In Security & compliance admin center > Threat Management > Policy > Anti-phishing. Enable the settings."}],"references":{"blocks":[{"data":{},"key":"42jki","inlineStyleRanges":[],"entityRanges":[],"text":"https://www.iorad.com/player/1797326/MS-500---You-need-to-protect-against-phishing-attacks-","depth":0,"type":"unstyled"},{"type":"ordered-list-item","entityRanges":[],"data":{},"depth":0,"text":"Open the Security & Compliance Admin center","key":"aj23h","inlineStyleRanges":[]},{"entityRanges":[],"depth":0,"text":"Click Threat Management > Policy > Anti-Phishing > Default policy","data":{},"key":"8i7t1","inlineStyleRanges":[],"type":"ordered-list-item"},{"depth":0,"inlineStyleRanges":[],"key":"1g8r0","entityRanges":[],"text":"Click Edit impersonation policy","type":"ordered-list-item","data":{}},{"key":"3t9je","type":"ordered-list-item","depth":0,"text":"Go to Add domains to protect.","entityRanges":[],"inlineStyleRanges":[],"data":{}},{"data":{},"entityRanges":[],"key":"6u4eq","text":"Enable Automatically include the domains I own","inlineStyleRanges":[],"depth":0,"type":"ordered-list-item"},{"type":"ordered-list-item","data":{},"entityRanges":[],"key":"7dag8","depth":0,"text":"Go to actions","inlineStyleRanges":[]},{"type":"ordered-list-item","entityRanges":[],"data":{},"key":"d694b","text":"Click Don't apply any action and set to Quarantine the message","inlineStyleRanges":[],"depth":0},{"text":"Go to Mailbox Intelligence","entityRanges":[],"data":{},"key":"c4vv5","depth":0,"type":"ordered-list-item","inlineStyleRanges":[]},{"text":"Click Enable mailbox intelligence-based impersonation protection.","inlineStyleRanges":[],"type":"ordered-list-item","entityRanges":[],"key":"17lmp","data":{},"depth":0},{"key":"c2c11","entityRanges":[],"data":{},"inlineStyleRanges":[],"text":"Click If email is sent by an impersonated user. Set to Quarantine the message.","depth":0,"type":"ordered-list-item"},{"inlineStyleRanges":[],"type":"ordered-list-item","entityRanges":[],"data":{},"key":"egrsb","depth":0,"text":"Save"},{"key":"8jkc1","type":"unstyled","text":"https://support.office.com/en-us/article/protect-against-phishing-attempts-in-microsoft-365-86c425e1-1686-430a-9151-f7176cce4f2c#ID0EAABAAA=Try_it","data":{},"depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"type":"unstyled","inlineStyleRanges":[],"entityRanges":[],"text":"https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/set-up-anti-phishing-policies?view=o365-worldwide#example-anti-phishing-policy-to- protect-a-user-and-a-domain","data":{},"key":"9dqq3","depth":0}],"entityMap":{}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: '1ZxHIf1rT',
      questionIdx: '',
      questionHtml: `<p>SIMULATION -</p>
<p>You need to protect against phishing attacks. The solution must meet the following requirements:</p>
<ul>
<li>Phishing email messages must be quarantined if the messages are sent from a spoofed domain.</li>
<li>As many phishing email messages as possible must be identified.</li>
</ul>
<p>The solution must apply to the current SMTP domain names and any domain names added later.</p>
<p>To complete this task, sign in to the Microsoft 365 admin center.</p>
`,
      referencesHtml: `<p>https://www.iorad.com/player/1797326/MS-500---You-need-to-protect-against-phishing-attacks-</p>
<ol>
<li>Open the Security &amp; Compliance Admin center</li>
<li>Click Threat Management &gt; Policy &gt; Anti-Phishing &gt; Default policy</li>
<li>Click Edit impersonation policy</li>
<li>Go to Add domains to protect.</li>
<li>Enable Automatically include the domains I own</li>
<li>Go to actions</li>
<li>Click Don't apply any action and set to Quarantine the message</li>
<li>Go to Mailbox Intelligence</li>
<li>Click Enable mailbox intelligence-based impersonation protection.</li>
<li>Click If email is sent by an impersonated user. Set to Quarantine the message.</li>
<li>Save</li>
</ol>
<p>https://support.office.com/en-us/article/protect-against-phishing-attempts-in-microsoft-365-86c425e1-1686-430a-9151-f7176cce4f2c#ID0EAABAAA=Try_it</p>
<p>https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/set-up-anti-phishing-policies?view=o365-worldwide#example-anti-phishing-policy-to- protect-a-user-and-a-domain</p>
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
