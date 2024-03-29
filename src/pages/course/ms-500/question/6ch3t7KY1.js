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
      question: {"references":{"entityMap":{},"blocks":[{"entityRanges":[],"key":"atuk","type":"unstyled","inlineStyleRanges":[{"offset":0,"style":"BOLD","length":10}],"data":{},"depth":0,"text":"Box 1: Yes"},{"depth":0,"entityRanges":[],"inlineStyleRanges":[],"type":"unstyled","key":"5lmf","data":{},"text":"Device2 is in Group2 so Policy2 applies."},{"data":{},"type":"unstyled","depth":0,"entityRanges":[],"key":"fng6i","inlineStyleRanges":[],"text":"Device2 is not compliant with Policy2. However, the device won't be marked as non-compliant until 10 days after the device was enrolled."},{"inlineStyleRanges":[{"length":10,"style":"BOLD","offset":0}],"depth":0,"data":{},"entityRanges":[],"type":"unstyled","key":"gcor","text":"Box 2: Yes"},{"type":"unstyled","data":{},"entityRanges":[],"depth":0,"inlineStyleRanges":[],"text":"Device1 is in Group1 and Group2 so both Policy1 and Policy2 apply.","key":"eku7n"},{"data":{},"text":"Device1 is compliant with Policy1 but non-compliant with Policy2. However, the device wonג€™t be marked as non-compliant until 10 days after the device was enrolled.","key":"ik9r","depth":0,"type":"unstyled","entityRanges":[],"inlineStyleRanges":[]},{"key":"8ujou","entityRanges":[],"text":"Box 3: No","type":"unstyled","depth":0,"data":{},"inlineStyleRanges":[{"offset":0,"style":"BOLD","length":9}]},{"type":"unstyled","text":"Device1 is in Group1 and Group2 so both Policy1 and Policy2 apply.","inlineStyleRanges":[],"key":"cs208","depth":0,"data":{},"entityRanges":[]},{"text":"Device1 is compliant with Policy1 but non-compliant with Policy2. th","data":{},"depth":0,"key":"1d05a","type":"unstyled","inlineStyleRanges":[],"entityRanges":[]},{"key":"ftmse","depth":0,"entityRanges":[],"type":"unstyled","inlineStyleRanges":[{"length":8,"offset":0,"style":"BOLD"}],"data":{},"text":"March 12"},{"type":"unstyled","key":"amnb3","text":"is more than 10 days after the device was enrolled so it will now be marked as non-compliant by Policy2.","data":{},"depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"entityRanges":[],"type":"unstyled","data":{},"inlineStyleRanges":[],"key":"l8kn","depth":0,"text":"Implement and manage threat protection"}]},"id":"6ch3t7KY1","answers":[{"value":"On March 2, 2020, Device2 is marked as compliant","isCorrectAnswer":true},{"isCorrectAnswer":true,"value":"On March6, 2020, Device1 is marked as compliant"},{"value":"On March12, 2020, Device1 is marked as compliant","isCorrectAnswer":false}],"question":{"blocks":[{"depth":0,"data":{},"inlineStyleRanges":[],"text":"You have a Microsoft 365 E5 subscription that uses Microsoft Endpoint Manager.","type":"unstyled","key":"8ag66","entityRanges":[]},{"data":{},"entityRanges":[],"key":"3cv0k","text":"The Compliance policy settings are configured as shown in the following exhibit.","inlineStyleRanges":[],"depth":0,"type":"unstyled"},{"depth":0,"text":" ","data":{},"inlineStyleRanges":[],"entityRanges":[{"offset":0,"key":0,"length":1}],"type":"atomic","key":"fdqe7"},{"key":"2spop","entityRanges":[],"depth":0,"data":{},"inlineStyleRanges":[],"text":"On February 25, 2020, you create the device compliance policies shown in the following table","type":"unstyled"},{"depth":0,"text":" ","entityRanges":[{"offset":0,"length":1,"key":1}],"key":"6iobr","inlineStyleRanges":[],"data":{},"type":"atomic"},{"entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"data":{},"text":"On March 1. 2020, users enroll Windows 10 devices in Microsoft Endpoint Manager as shown in the following table.","key":"fkr64","depth":0},{"data":{},"inlineStyleRanges":[],"text":" ","key":"2euoh","entityRanges":[{"key":2,"offset":0,"length":1}],"type":"atomic","depth":0},{"key":"drps6","type":"unstyled","text":"Check the box next to each correct statement.","inlineStyleRanges":[],"entityRanges":[],"data":{},"depth":0}],"entityMap":{"0":{"type":"IMAGE","data":{"alignment":"left","src":"https://i.ibb.co/7QprCW9/Compliance-policy-default-settings.png","width":"auto","height":"auto","alt":"Compliance policy default settings"},"mutability":"MUTABLE"},"1":{"mutability":"MUTABLE","data":{"src":"https://i.ibb.co/jwQmNd9/policies.png","height":"auto","width":"auto","alignment":"left","alt":"Device Compliance Settings"},"type":"IMAGE"},"2":{"mutability":"MUTABLE","type":"IMAGE","data":{"alt":"Device security chart","height":"auto","alignment":"left","width":"auto","src":"https://i.ibb.co/4MfNCtJ/device-security-chart.png"}}}}},
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
              <Row className="img-width-100">
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
