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
      question: {"id":"Ok8qTFfS1","question":{"entityMap":{},"blocks":[{"data":{},"type":"unstyled","inlineStyleRanges":[{"style":"color-rgb(80,80,80)","length":166,"offset":0},{"length":72,"offset":167,"style":"color-rgb(80,80,80)"},{"style":"bgcolor-rgb(255,255,255)","offset":0,"length":166},{"length":72,"style":"bgcolor-rgb(255,255,255)","offset":167},{"length":166,"style":"fontsize-16","offset":0},{"length":72,"offset":167,"style":"fontsize-16"},{"offset":0,"style":"fontfamily-Roboto Condensed\", sans-serif","length":166},{"offset":167,"style":"fontfamily-Roboto Condensed\", sans-serif","length":72}],"text":"SIMULATION - You need to ensure that a user named John Gruber can manage all the settings for Exchange Online. The solution must use the principle of least privilege.\nTo complete this task, sign in to the Microsoft Office 365 admin center.","entityRanges":[],"key":"eklqe","depth":0}]},"answers":[{"value":"From the Microsoft 365 Admin Center grant John Global Access Permissions","isCorrectAnswer":false},{"isCorrectAnswer":false,"value":"From the Microsoft 365 Admin Center license John with an Office 365 E3"},{"value":"From the Exchange Admin Center grant John the Organization Management role.","isCorrectAnswer":true},{"value":"From the Azure Active Directory Admin Center grant John the Application administrator role","isCorrectAnswer":false}],"references":{"blocks":[{"depth":0,"key":"2o2c","text":"https://www.iorad.com/player/1795870/MS-500---How-to-grant-user-Exchange-Online-Admin-Access ","inlineStyleRanges":[{"length":92,"style":"color-rgb(33,37,41)","offset":0},{"length":92,"offset":0,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"style":"fontsize-16","length":92},{"length":92,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","offset":0}],"data":{},"entityRanges":[],"type":"unstyled"},{"text":"In the Exchange Administration Center (EAC), navigate to Permissions > Admin Roles.","depth":0,"inlineStyleRanges":[],"entityRanges":[],"type":"ordered-list-item","key":"533lg","data":{}},{"entityRanges":[],"text":"Select the group: Organization Management and then click on Edit.","data":{},"key":"7le02","depth":0,"type":"ordered-list-item","inlineStyleRanges":[]},{"depth":0,"type":"ordered-list-item","data":{},"key":"3edon","text":"In the Members section, click on Add.","entityRanges":[],"inlineStyleRanges":[]},{"inlineStyleRanges":[],"entityRanges":[],"key":"4hmpa","data":{},"type":"ordered-list-item","text":"Select the users, USGs, or other role groups you want to add to the role group, click on Add, and then click on OK.","depth":0},{"entityRanges":[],"depth":0,"inlineStyleRanges":[],"text":"Click on Save to save the changes to the role group.","type":"ordered-list-item","key":"4ogck","data":{}},{"key":"4pv3f","depth":0,"type":"unstyled","entityRanges":[],"text":"Reference:","data":{},"inlineStyleRanges":[{"style":"BOLD","length":9,"offset":0}]},{"inlineStyleRanges":[],"key":"fhfns","data":{},"depth":0,"entityRanges":[],"text":"https://help.bittitan.com/hc/en-us/articles/115008104507-How-do-I-assign-the-elevated-admin-role-Organization-Management-to-the-account-that-is-performing-a-","type":"unstyled"},{"data":{},"text":"Public-Folder-migration-","depth":0,"inlineStyleRanges":[],"key":"a0ofo","type":"unstyled","entityRanges":[]},{"entityRanges":[],"depth":0,"inlineStyleRanges":[],"type":"unstyled","key":"e28cv","data":{},"text":"https://docs.microsoft.com/en-us/exchange/permissions-exo/permissions-exo"}],"entityMap":{}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'Ok8qTFfS1',
      questionIdx: '',
      questionHtml: `<p><span style="color: rgb(80,80,80);background-color: rgb(255,255,255);font-size: 16px;font-family: Roboto Condensed", sans-serif;">SIMULATION - You need to ensure that a user named John Gruber can manage all the settings for Exchange Online. The solution must use the principle of least privilege.</span><br><span style="color: rgb(80,80,80);background-color: rgb(255,255,255);font-size: 16px;font-family: Roboto Condensed", sans-serif;">To complete this task, sign in to the Microsoft Office 365 admin center.</span></p>
`,
      referencesHtml: `<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">https://www.iorad.com/player/1795870/MS-500---How-to-grant-user-Exchange-Online-Admin-Access</span>&nbsp;</p>
<ol>
<li>In the Exchange Administration Center (EAC), navigate to Permissions &gt; Admin Roles.</li>
<li>Select the group: Organization Management and then click on Edit.</li>
<li>In the Members section, click on Add.</li>
<li>Select the users, USGs, or other role groups you want to add to the role group, click on Add, and then click on OK.</li>
<li>Click on Save to save the changes to the role group.</li>
</ol>
<p><strong>Reference</strong>:</p>
<p>https://help.bittitan.com/hc/en-us/articles/115008104507-How-do-I-assign-the-elevated-admin-role-Organization-Management-to-the-account-that-is-performing-a-</p>
<p>Public-Folder-migration-</p>
<p>https://docs.microsoft.com/en-us/exchange/permissions-exo/permissions-exo</p>
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
