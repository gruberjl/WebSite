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
      question: {"id":"P-5iY4LsW","answers":[{"isCorrectAnswer":true,"value":"In the montreal office, if User1 downloads 40 files in 30 seconds, an alert will be created."},{"isCorrectAnswer":true,"value":"In the Seattle office, if User2 downloads one file per second for two minutes, an alert will be created"},{"value":"In the New York office, if User1 downloads 40 files in 10 seconds, an alert will be created.","isCorrectAnswer":false}],"question":{"entityMap":{"0":{"mutability":"MUTABLE","type":"IMAGE","data":{"height":"auto","width":"auto","alignment":"left","alt":"Location chart","src":"https://i.ibb.co/MDcKN4R/location-chart.png"}},"1":{"data":{"width":"auto","alt":"Users chart","alignment":"left","height":"auto","src":"https://i.ibb.co/cw2YC3W/users-chart.png"},"mutability":"MUTABLE","type":"IMAGE"},"2":{"data":{"height":"auto","alignment":"left","alt":"Policy Filter","width":"auto","src":"https://i.ibb.co/cQNvDmf/policy-filter.png"},"type":"IMAGE","mutability":"MUTABLE"},"3":{"type":"IMAGE","mutability":"MUTABLE","data":{"alignment":"left","width":"auto","height":"auto","src":"https://i.ibb.co/yXBMZm7/Policy-Alert.png","alt":"Policy Alert"}}},"blocks":[{"entityRanges":[],"data":{},"type":"unstyled","text":"Your company has a Microsoft 365 subscription, a Microsoft Azure subscription, and an Azure Active Directory (Azure AD) tenant named contoso.com.","depth":0,"key":"8vprs","inlineStyleRanges":[]},{"data":{},"depth":0,"type":"unstyled","inlineStyleRanges":[],"text":"The company has the offices shown in the following table.","key":"a3ln6","entityRanges":[]},{"entityRanges":[{"key":0,"offset":0,"length":1}],"key":"1eeo1","depth":0,"data":{},"type":"atomic","inlineStyleRanges":[],"text":" "},{"inlineStyleRanges":[],"data":{},"entityRanges":[],"depth":0,"key":"1r9kv","type":"unstyled","text":"The tenant contains the users shown in the following table."},{"text":" ","data":{},"inlineStyleRanges":[],"entityRanges":[{"key":1,"length":1,"offset":0}],"depth":0,"key":"27nqr","type":"atomic"},{"text":"You create the Microsoft Cloud App Security policy shown in the following exhibit.","inlineStyleRanges":[{"offset":0,"style":"color-rgb(80,80,80)","length":82},{"offset":0,"length":82,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"style":"fontsize-16","length":82},{"style":"fontfamily-Roboto Condensed\", sans-serif","length":82,"offset":0}],"data":{},"key":"5nibv","type":"unstyled","entityRanges":[],"depth":0},{"text":" ","inlineStyleRanges":[],"entityRanges":[{"length":1,"offset":0,"key":2}],"type":"atomic","key":"fbe54","data":{},"depth":0},{"data":{},"key":"bjtno","inlineStyleRanges":[],"type":"unstyled","entityRanges":[],"depth":0,"text":""},{"type":"atomic","data":{},"depth":0,"inlineStyleRanges":[],"text":" ","key":"4qpph","entityRanges":[{"offset":0,"key":3,"length":1}]},{"inlineStyleRanges":[],"depth":0,"entityRanges":[],"key":"38sdi","text":"For each of the following statements, check the box if the statement is true.","type":"unstyled","data":{}}]},"references":{"blocks":[{"depth":0,"type":"unstyled","inlineStyleRanges":[],"entityRanges":[],"data":{},"key":"fqqbc","text":""}],"entityMap":{}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'P-5iY4LsW',
      questionIdx: '',
      questionHtml: `<p>Your company has a Microsoft 365 subscription, a Microsoft Azure subscription, and an Azure Active Directory (Azure AD) tenant named contoso.com.</p>
<p>The company has the offices shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/MDcKN4R/location-chart.png" alt="Location chart" style="height: auto;width: auto"/></div>
<p>The tenant contains the users shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/cw2YC3W/users-chart.png" alt="Users chart" style="height: auto;width: auto"/></div>
<p><span style="color: rgb(80,80,80);background-color: rgb(255,255,255);font-size: 16px;font-family: Roboto Condensed", sans-serif;">You create the Microsoft Cloud App Security policy shown in the following exhibit.</span></p>
<div style="text-align:left;"><img src="https://i.ibb.co/cQNvDmf/policy-filter.png" alt="Policy Filter" style="height: auto;width: auto"/></div>
<p></p>
<div style="text-align:left;"><img src="https://i.ibb.co/yXBMZm7/Policy-Alert.png" alt="Policy Alert" style="height: auto;width: auto"/></div>
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
