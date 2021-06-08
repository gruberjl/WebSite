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

    firebase.auth().onAuthStateChanged(this.setUid)

    this.state = {
      questions: {},
      uid: '',
      testId: params.get('testId'),
      test: {},
      question: {"id":"6ch3t7KY1","answers":[{"isCorrectAnswer":true,"value":"On March 2, 2020, Device2 is marked as compliant"},{"value":"On March6, 2020, Device1 is marked as compliant","isCorrectAnswer":true},{"value":"On March12, 2020, Device1 is marked as compliant","isCorrectAnswer":false}],"references":{"blocks":[{"inlineStyleRanges":[{"length":10,"offset":0,"style":"BOLD"}],"entityRanges":[],"text":"Box 1: Yes","type":"unstyled","depth":0,"key":"atuk","data":{}},{"key":"5lmf","depth":0,"data":{},"entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"text":"Device2 is in Group2 so Policy2 applies."},{"type":"unstyled","inlineStyleRanges":[],"data":{},"entityRanges":[],"depth":0,"key":"fng6i","text":"Device2 is not compliant with Policy2. However, the device won't be marked as non-compliant until 10 days after the device was enrolled."},{"entityRanges":[],"key":"gcor","type":"unstyled","text":"Box 2: Yes","inlineStyleRanges":[{"style":"BOLD","offset":0,"length":10}],"data":{},"depth":0},{"text":"Device1 is in Group1 and Group2 so both Policy1 and Policy2 apply.","type":"unstyled","key":"eku7n","data":{},"inlineStyleRanges":[],"entityRanges":[],"depth":0},{"text":"Device1 is compliant with Policy1 but non-compliant with Policy2. However, the device wonג€™t be marked as non-compliant until 10 days after the device was enrolled.","key":"ik9r","data":{},"inlineStyleRanges":[],"depth":0,"type":"unstyled","entityRanges":[]},{"data":{},"inlineStyleRanges":[{"offset":0,"style":"BOLD","length":9}],"text":"Box 3: No","entityRanges":[],"type":"unstyled","depth":0,"key":"8ujou"},{"inlineStyleRanges":[],"text":"Device1 is in Group1 and Group2 so both Policy1 and Policy2 apply.","key":"cs208","depth":0,"entityRanges":[],"data":{},"type":"unstyled"},{"text":"Device1 is compliant with Policy1 but non-compliant with Policy2. th","data":{},"type":"unstyled","entityRanges":[],"key":"1d05a","depth":0,"inlineStyleRanges":[]},{"inlineStyleRanges":[{"length":8,"offset":0,"style":"BOLD"}],"entityRanges":[],"data":{},"key":"ftmse","depth":0,"text":"March 12","type":"unstyled"},{"key":"amnb3","entityRanges":[],"type":"unstyled","data":{},"text":"is more than 10 days after the device was enrolled so it will now be marked as non-compliant by Policy2.","inlineStyleRanges":[],"depth":0},{"data":{},"key":"l8kn","depth":0,"type":"unstyled","text":"Implement and manage threat protection","inlineStyleRanges":[],"entityRanges":[]}],"entityMap":{}},"question":{"blocks":[{"key":"8ag66","type":"unstyled","entityRanges":[],"text":"You have a Microsoft 365 E5 subscription that uses Microsoft Endpoint Manager.","inlineStyleRanges":[],"depth":0,"data":{}},{"entityRanges":[],"depth":0,"key":"3cv0k","text":"The Compliance policy settings are configured as shown in the following exhibit.","type":"unstyled","inlineStyleRanges":[],"data":{}},{"key":"fdqe7","text":" ","type":"atomic","data":{},"entityRanges":[{"offset":0,"key":0,"length":1}],"depth":0,"inlineStyleRanges":[]},{"entityRanges":[],"data":{},"inlineStyleRanges":[],"text":"On February 25, 2020, you create the device compliance policies shown in the following table","key":"2spop","type":"unstyled","depth":0},{"key":"6iobr","inlineStyleRanges":[],"data":{},"type":"atomic","entityRanges":[{"offset":0,"length":1,"key":1}],"depth":0,"text":" "},{"text":"On March 1. 2020, users enroll Windows 10 devices in Microsoft Endpoint Manager as shown in the following table.","inlineStyleRanges":[],"entityRanges":[],"depth":0,"key":"fkr64","type":"unstyled","data":{}},{"entityRanges":[{"length":1,"offset":0,"key":2}],"key":"2euoh","text":" ","inlineStyleRanges":[],"data":{},"type":"atomic","depth":0},{"type":"unstyled","entityRanges":[],"key":"drps6","inlineStyleRanges":[],"text":"Check the box next to each correct statement.","data":{},"depth":0},{"inlineStyleRanges":[],"type":"unstyled","entityRanges":[],"data":{},"key":"ckdub","depth":0,"text":"NOTE: Each correct selection is worth one point."}],"entityMap":{"0":{"mutability":"MUTABLE","type":"IMAGE","data":{"height":"auto","alt":"Compliance policy default settings","src":"https://i.ibb.co/7QprCW9/Compliance-policy-default-settings.png","width":"auto","alignment":"left"}},"1":{"type":"IMAGE","data":{"src":"https://i.ibb.co/jwQmNd9/policies.png","alignment":"left","width":"auto","height":"auto","alt":"Device Compliance Settings"},"mutability":"MUTABLE"},"2":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"https://i.ibb.co/4MfNCtJ/device-security-chart.png","alt":"Device security chart","width":"auto","height":"auto","alignment":"left"}}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: '6ch3t7KY1',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft 365 E5 subscription that uses Microsoft Endpoint Manager.</p>
<p>The Compliance policy settings are configured as shown in the following exhibit.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/7QprCW9/Compliance-policy-default-settings.png" alt="Compliance policy default settings" style="height: auto;width: auto"/></div>
<p>On February 25, 2020, you create the device compliance policies shown in the following table</p>
<div style="text-align:left;"><img src="https://i.ibb.co/jwQmNd9/policies.png" alt="Device Compliance Settings" style="height: auto;width: auto"/></div>
<p>On March 1. 2020, users enroll Windows 10 devices in Microsoft Endpoint Manager as shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/4MfNCtJ/device-security-chart.png" alt="Device security chart" style="height: auto;width: auto"/></div>
<p>Check the box next to each correct statement.</p>
<p>NOTE: Each correct selection is worth one point.</p>
`,
      referencesHtml: `<p><strong>Box 1: Yes</strong></p>
<p>Device2 is in Group2 so Policy2 applies.</p>
<p>Device2 is not compliant with Policy2. However, the device won't be marked as non-compliant until 10 days after the device was enrolled.</p>
<p><strong>Box 2: Yes</strong></p>
<p>Device1 is in Group1 and Group2 so both Policy1 and Policy2 apply.</p>
<p>Device1 is compliant with Policy1 but non-compliant with Policy2. However, the device wonג€™t be marked as non-compliant until 10 days after the device was enrolled.</p>
<p><strong>Box 3: No</strong></p>
<p>Device1 is in Group1 and Group2 so both Policy1 and Policy2 apply.</p>
<p>Device1 is compliant with Policy1 but non-compliant with Policy2. th</p>
<p><strong>March 12</strong></p>
<p>is more than 10 days after the device was enrolled so it will now be marked as non-compliant by Policy2.</p>
<p>Implement and manage threat protection</p>
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
