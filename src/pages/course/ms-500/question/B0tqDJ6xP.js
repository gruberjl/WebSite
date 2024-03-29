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
      question: {"answers":[{"value":"If User1 types \"Product1 and Product2\" in a document and saves the document in Microsoft Word, the document will be assigned Label1 sensitivity automatically.","isCorrectAnswer":false},{"isCorrectAnswer":true,"value":"If User1 types \"Product2 and Product1\" in a document and saves the document in Microsoft Word, the document will be assigned Label2 sensitivity automatically."},{"value":"If User1 types \"product2\" in a document and saves the document in Microsoft Word, the document will be assigned Label2 sensitivity automatically.","isCorrectAnswer":false}],"id":"B0tqDJ6xP","question":{"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"alt":"Condition chart","width":"auto","src":"https://i.ibb.co/Hz0XgJn/condition-chart.png","height":"auto","alignment":"left"}},"1":{"mutability":"MUTABLE","data":{"alt":"Label Conditions","height":"auto","src":"https://i.ibb.co/xYd5gCX/label-conditions.png","width":"auto","alignment":"left"},"type":"IMAGE"},"2":{"type":"IMAGE","data":{"src":"https://i.ibb.co/H7SJhBG/policy-chart2.png","height":"auto","alt":"Policy Chart","alignment":"left","width":"auto"},"mutability":"MUTABLE"}},"blocks":[{"entityRanges":[],"inlineStyleRanges":[],"key":"arbvt","data":{},"text":"You have the Microsoft Azure Information Protection conditions shown in the following table.","depth":0,"type":"unstyled"},{"entityRanges":[{"key":0,"length":1,"offset":0}],"data":{},"key":"8a52q","depth":0,"type":"atomic","text":" ","inlineStyleRanges":[]},{"key":"culrr","entityRanges":[],"type":"unstyled","text":"You have the Azure Information Protection labels shown in the following table.","depth":0,"data":{},"inlineStyleRanges":[]},{"data":{},"entityRanges":[{"key":1,"length":1,"offset":0}],"text":" ","key":"19tkh","depth":0,"inlineStyleRanges":[],"type":"atomic"},{"key":"71qem","text":"You have the Azure Information Protection policies shown in the following table.","depth":0,"inlineStyleRanges":[],"type":"unstyled","data":{},"entityRanges":[]},{"data":{},"type":"atomic","entityRanges":[{"offset":0,"key":2,"length":1}],"key":"9i63c","inlineStyleRanges":[],"text":" ","depth":0},{"type":"unstyled","data":{},"inlineStyleRanges":[],"key":"3ebb3","depth":0,"entityRanges":[],"text":"For each of the following statements, check the box if the statement is true."}]},"references":{"blocks":[{"entityRanges":[],"key":"alqe8","type":"unstyled","depth":0,"data":{},"inlineStyleRanges":[],"text":"https://docs.microsoft.com/en-us/microsoft-365/compliance/sensitivity-labels?view=o365-worldwide"},{"entityRanges":[],"type":"unstyled","key":"c8das","data":{},"inlineStyleRanges":[{"length":96,"style":"color-rgb(23,23,23)","offset":0},{"length":91,"style":"color-rgb(23,23,23)","offset":104},{"style":"color-rgb(23,23,23)","length":2,"offset":199},{"offset":0,"length":96,"style":"bgcolor-rgb(255,255,255)"},{"length":91,"style":"bgcolor-rgb(255,255,255)","offset":104},{"style":"bgcolor-rgb(255,255,255)","length":2,"offset":199},{"offset":0,"length":96,"style":"fontsize-16"},{"offset":104,"length":91,"style":"fontsize-16"},{"offset":199,"length":2,"style":"fontsize-16"},{"style":"fontfamily-Segoe UI\", SegoeUI, \"Helvetica Neue\", Helvetica, Arial, sans-serif","offset":0,"length":96},{"offset":104,"length":91,"style":"fontfamily-Segoe UI\", SegoeUI, \"Helvetica Neue\", Helvetica, Arial, sans-serif"},{"offset":199,"length":2,"style":"fontfamily-Segoe UI\", SegoeUI, \"Helvetica Neue\", Helvetica, Arial, sans-serif"},{"length":6,"style":"BOLD","offset":97},{"style":"BOLD","length":3,"offset":196}],"depth":0,"text":"\"You want your most restrictive sensitivity label, such as Highly Confidential, to appear at the bottom of the list, and your least restrictive sensitivity label, such as Public, to appear at the top.\""},{"entityRanges":[],"text":"Since the first 2 documents contain Product1 & Product2 Label2 is applied.","data":{},"depth":0,"key":"bvdfr","type":"unstyled","inlineStyleRanges":[{"offset":0,"length":74,"style":"color-rgb(23,23,23)"},{"offset":0,"style":"bgcolor-rgb(255,255,255)","length":74},{"style":"fontsize-16","length":74,"offset":0},{"offset":0,"style":"fontfamily-Segoe UI\", SegoeUI, \"Helvetica Neue\", Helvetica, Arial, sans-serif","length":74}]},{"key":"837ic","text":"Since condition2 is case sensitive the third documet does not receive the label.","type":"unstyled","depth":0,"entityRanges":[],"inlineStyleRanges":[{"offset":0,"style":"color-rgb(23,23,23)","length":80},{"style":"bgcolor-rgb(255,255,255)","offset":0,"length":80},{"length":80,"style":"fontsize-16","offset":0},{"length":80,"offset":0,"style":"fontfamily-Segoe UI\", SegoeUI, \"Helvetica Neue\", Helvetica, Arial, sans-serif"}],"data":{}}],"entityMap":{}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'B0tqDJ6xP',
      questionIdx: '',
      questionHtml: `<p>You have the Microsoft Azure Information Protection conditions shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/Hz0XgJn/condition-chart.png" alt="Condition chart" style="height: auto;width: auto"/></div>
<p>You have the Azure Information Protection labels shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/xYd5gCX/label-conditions.png" alt="Label Conditions" style="height: auto;width: auto"/></div>
<p>You have the Azure Information Protection policies shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/H7SJhBG/policy-chart2.png" alt="Policy Chart" style="height: auto;width: auto"/></div>
<p>For each of the following statements, check the box if the statement is true.</p>
`,
      referencesHtml: `<p>https://docs.microsoft.com/en-us/microsoft-365/compliance/sensitivity-labels?view=o365-worldwide</p>
<p><span style="color: rgb(23,23,23);background-color: rgb(255,255,255);font-size: 16px;font-family: Segoe UI", SegoeUI, "Helvetica Neue", Helvetica, Arial, sans-serif;">"You want your most restrictive sensitivity label, such as Highly Confidential, to appear at the</span> <strong>bottom</strong> <span style="color: rgb(23,23,23);background-color: rgb(255,255,255);font-size: 16px;font-family: Segoe UI", SegoeUI, "Helvetica Neue", Helvetica, Arial, sans-serif;">of the list, and your least restrictive sensitivity label, such as Public, to appear at the</span> <strong>top</strong><span style="color: rgb(23,23,23);background-color: rgb(255,255,255);font-size: 16px;font-family: Segoe UI", SegoeUI, "Helvetica Neue", Helvetica, Arial, sans-serif;">."</span></p>
<p><span style="color: rgb(23,23,23);background-color: rgb(255,255,255);font-size: 16px;font-family: Segoe UI", SegoeUI, "Helvetica Neue", Helvetica, Arial, sans-serif;">Since the first 2 documents contain Product1 &amp; Product2 Label2 is applied.</span></p>
<p><span style="color: rgb(23,23,23);background-color: rgb(255,255,255);font-size: 16px;font-family: Segoe UI", SegoeUI, "Helvetica Neue", Helvetica, Arial, sans-serif;">Since condition2 is case sensitive the third documet does not receive the label.</span></p>
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
