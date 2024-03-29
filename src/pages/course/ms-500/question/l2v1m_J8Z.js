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
      question: {"answers":[{"isCorrectAnswer":true,"value":"External users can access File1"},{"isCorrectAnswer":false,"value":"The users in contoso.com can access File2"},{"isCorrectAnswer":false,"value":"External users can access File3"}],"references":{"blocks":[{"key":"5t3am","data":{},"text":"","type":"unstyled","depth":0,"entityRanges":[],"inlineStyleRanges":[]}],"entityMap":{}},"id":"l2v1m_J8Z","question":{"blocks":[{"key":"50gpj","inlineStyleRanges":[],"entityRanges":[],"type":"unstyled","depth":0,"text":"You have a Microsoft 365 subscription that uses an Azure Active Directory (Azure AD) tenant named contoso.com.","data":{}},{"entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"text":"OneDrive stores files that are shared with external users. The files are configured as shown in the following table.","key":"260nn","data":{},"depth":0},{"key":"euhdj","data":{},"depth":0,"inlineStyleRanges":[],"entityRanges":[{"key":0,"length":1,"offset":0}],"type":"atomic","text":" "},{"key":"a6paf","inlineStyleRanges":[],"text":"You create a data loss prevention (DLP) policy that applies to the content stored in OneDrive accounts. The policy contains the following three rules:","entityRanges":[],"type":"unstyled","depth":0,"data":{}},{"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"depth":0,"type":"unstyled","key":"6vh9m","data":{},"text":"Rule1:"},{"data":{},"text":"Conditions: Label1, Detect content that's shared with people outside my organization","entityRanges":[],"key":"1ui6b","inlineStyleRanges":[],"type":"unordered-list-item","depth":0},{"inlineStyleRanges":[],"data":{},"type":"unordered-list-item","entityRanges":[],"depth":0,"text":"Actions: Restrict access to the content for external users","key":"5q0vt"},{"text":"User notifications: Notify the user who last modified the content","entityRanges":[],"inlineStyleRanges":[],"data":{},"type":"unordered-list-item","key":"ervr","depth":0},{"data":{},"entityRanges":[],"type":"unordered-list-item","depth":0,"text":"User overrides: On","inlineStyleRanges":[],"key":"cv2dv"},{"type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"data":{},"entityRanges":[],"text":"Priority: 0","key":"av8gm"},{"entityRanges":[],"key":"og34","data":{},"inlineStyleRanges":[{"length":5,"style":"BOLD","offset":0}],"type":"unstyled","text":"Rule2:","depth":0},{"key":"cjeds","type":"unordered-list-item","depth":0,"data":{},"entityRanges":[],"inlineStyleRanges":[],"text":"Conditions: Label1 or Label2"},{"entityRanges":[],"text":"Actions: Restrict access to the content","key":"854sf","data":{},"depth":0,"type":"unordered-list-item","inlineStyleRanges":[]},{"inlineStyleRanges":[],"depth":0,"entityRanges":[],"type":"unordered-list-item","key":"3s1li","data":{},"text":"Priority: 1"},{"inlineStyleRanges":[{"style":"BOLD","length":5,"offset":0}],"entityRanges":[],"key":"5ujn5","depth":0,"type":"unstyled","text":"Rule3:","data":{}},{"key":"f2jcf","inlineStyleRanges":[],"text":"Conditions: Label2, Detect content that's shared with people outside my organization","type":"unordered-list-item","entityRanges":[],"data":{},"depth":0},{"key":"4rk5n","entityRanges":[],"depth":0,"type":"unordered-list-item","data":{},"inlineStyleRanges":[],"text":"Actions: Restrict access to the content for external users"},{"entityRanges":[],"text":"User notifications: Notify the user who last modified the content","data":{},"depth":0,"type":"unordered-list-item","key":"6lr8c","inlineStyleRanges":[]},{"data":{},"inlineStyleRanges":[],"text":"User overrides: On","key":"7iado","entityRanges":[],"type":"unordered-list-item","depth":0},{"data":{},"entityRanges":[],"type":"unordered-list-item","text":"Priority: 2","depth":0,"inlineStyleRanges":[],"key":"1mk1m"},{"data":{},"depth":0,"entityRanges":[],"text":"For each of the following statements, check the box if the statement is true.","inlineStyleRanges":[],"key":"4p8lg","type":"unstyled"}],"entityMap":{"0":{"type":"IMAGE","data":{"height":"auto","width":"auto","src":"https://i.ibb.co/rMYDH1g/file-labels.png","alignment":"left","alt":"Files and labels chart"},"mutability":"MUTABLE"}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'l2v1m_J8Z',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft 365 subscription that uses an Azure Active Directory (Azure AD) tenant named contoso.com.</p>
<p>OneDrive stores files that are shared with external users. The files are configured as shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/rMYDH1g/file-labels.png" alt="Files and labels chart" style="height: auto;width: auto"/></div>
<p>You create a data loss prevention (DLP) policy that applies to the content stored in OneDrive accounts. The policy contains the following three rules:</p>
<p><strong>Rule1</strong>:</p>
<ul>
<li>Conditions: Label1, Detect content that's shared with people outside my organization</li>
<li>Actions: Restrict access to the content for external users</li>
<li>User notifications: Notify the user who last modified the content</li>
<li>User overrides: On</li>
<li>Priority: 0</li>
</ul>
<p><strong>Rule2</strong>:</p>
<ul>
<li>Conditions: Label1 or Label2</li>
<li>Actions: Restrict access to the content</li>
<li>Priority: 1</li>
</ul>
<p><strong>Rule3</strong>:</p>
<ul>
<li>Conditions: Label2, Detect content that's shared with people outside my organization</li>
<li>Actions: Restrict access to the content for external users</li>
<li>User notifications: Notify the user who last modified the content</li>
<li>User overrides: On</li>
<li>Priority: 2</li>
</ul>
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
