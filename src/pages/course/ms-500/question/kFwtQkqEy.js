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
import {saveDoc, onAuthStateChanged, getDoc} from '../../../../components/firebase'
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

const isBrowser = () => typeof window !== 'undefined'

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

    this.state = {
      questions: {},
      uid: '',
      testId: params.get('testId'),
      test: {},
      question: {"answers":[{"value":"From Device2, User2 can copy data from App1 to App3","isCorrectAnswer":true},{"value":"From Device2, User1 can copy data from App1 to App2","isCorrectAnswer":true},{"isCorrectAnswer":false,"value":"From Device2, User1 can copy data from App1 to App3"}],"id":"kFwtQkqEy","question":{"blocks":[{"key":"1jrtu","inlineStyleRanges":[],"text":"You have a Microsoft 365 subscription that uses a default domain name of contoso.com.","entityRanges":[],"depth":0,"data":{},"type":"unstyled"},{"inlineStyleRanges":[],"depth":0,"key":"2p5f2","text":"Microsoft Azure Active Directory (Azure AD) contains the users shown in the following table.","entityRanges":[],"data":{},"type":"unstyled"},{"entityRanges":[{"offset":0,"key":0,"length":1}],"key":"5mpad","text":" ","depth":0,"inlineStyleRanges":[],"data":{},"type":"atomic"},{"key":"abq0p","text":"Microsoft Endpoint Manager has two devices enrolled as shown in the following table:","data":{},"entityRanges":[],"type":"unstyled","depth":0,"inlineStyleRanges":[]},{"type":"atomic","text":" ","entityRanges":[{"key":1,"length":1,"offset":0}],"data":{},"inlineStyleRanges":[],"key":"55lm4","depth":0},{"type":"unstyled","key":"doaun","inlineStyleRanges":[],"text":"Both devices have three apps named App1, App2, and App3 installed.","data":{},"entityRanges":[],"depth":0},{"type":"unstyled","data":{},"depth":0,"entityRanges":[],"key":"4p6gt","inlineStyleRanges":[],"text":"You create an app protection policy named ProtectionPolicy1 that has the following settings:"},{"text":"Protected apps: App1","inlineStyleRanges":[],"depth":0,"type":"unordered-list-item","data":{},"key":"5betb","entityRanges":[]},{"depth":0,"text":"Exempt apps: App2","entityRanges":[],"type":"unordered-list-item","key":"ai8uj","inlineStyleRanges":[],"data":{}},{"entityRanges":[],"data":{},"text":"Windows Information Protection mode: Block","depth":0,"type":"unordered-list-item","key":"2mjj5","inlineStyleRanges":[]},{"text":"You apply ProtectionPolicy1 to Group1 and Group3. You exclude Group2 from ProtectionPolicy1.","key":"bnbu5","entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"data":{},"depth":0},{"text":"For each of the following statements, check the box if the statement is true.","data":{},"entityRanges":[],"key":"1u2nf","depth":0,"type":"unstyled","inlineStyleRanges":[]}],"entityMap":{"0":{"mutability":"MUTABLE","type":"IMAGE","data":{"alignment":"left","width":"auto","alt":"User Group membership chart","src":"https://i.ibb.co/KxwDstM/user-group.png","height":"auto"}},"1":{"type":"IMAGE","data":{"width":"auto","alt":"Device chart","src":"https://i.ibb.co/c6d1kCM/device-chart.png","height":"auto","alignment":"left"},"mutability":"MUTABLE"}}},"references":{"entityMap":{"0":{"data":{"url":"https://www.gitbit.org/course/ms-500/learn/Restricting-and-managing-apps-on-user-devices-62t_7oiZx","targetOption":"_blank"},"mutability":"MUTABLE","type":"LINK"}},"blocks":[{"key":"copgf","data":{},"type":"unstyled","inlineStyleRanges":[],"depth":0,"entityRanges":[],"text":"Since User2 is a member of Group2 and Group2 is excluded from the policy User2 can copy data from App1 to App3."},{"text":"Since App2 is exempt from the policy User1 can copy data from App1 to App2.","key":"4l7r0","inlineStyleRanges":[],"entityRanges":[],"depth":0,"data":{},"type":"unstyled"},{"type":"unstyled","text":"Since User1 is a member of Group1 and Group1 is included in the app protection policy and User1 is not a member of Group2. And since App1 is protected by the app protection policy and is App3 is not exempt User1 cannot copy data from App1 to App3.","inlineStyleRanges":[],"key":"dhmt3","entityRanges":[],"depth":0,"data":{}},{"key":"c7d6c","inlineStyleRanges":[],"entityRanges":[{"key":0,"length":98,"offset":0}],"type":"unstyled","data":{},"text":"https://www.gitbit.org/course/ms-500/learn/Restricting-and-managing-apps-on-user-devices-62t_7oiZx","depth":0}]}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'kFwtQkqEy',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft 365 subscription that uses a default domain name of contoso.com.</p>
<p>Microsoft Azure Active Directory (Azure AD) contains the users shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/KxwDstM/user-group.png" alt="User Group membership chart" style="height: auto;width: auto"/></div>
<p>Microsoft Endpoint Manager has two devices enrolled as shown in the following table:</p>
<div style="text-align:left;"><img src="https://i.ibb.co/c6d1kCM/device-chart.png" alt="Device chart" style="height: auto;width: auto"/></div>
<p>Both devices have three apps named App1, App2, and App3 installed.</p>
<p>You create an app protection policy named ProtectionPolicy1 that has the following settings:</p>
<ul>
<li>Protected apps: App1</li>
<li>Exempt apps: App2</li>
<li>Windows Information Protection mode: Block</li>
</ul>
<p>You apply ProtectionPolicy1 to Group1 and Group3. You exclude Group2 from ProtectionPolicy1.</p>
<p>For each of the following statements, check the box if the statement is true.</p>
`,
      questionText: `You have a Microsoft 365 subscription that uses a default domain name of contoso.com. Microsoft Azure Active Directory (Azure AD) contains the users shown in the following table. Microsoft Endpoint Manager has two devices enrolled as shown in the following table: Both devices have three apps named App1, App2, and App3 installed. You create an app protection policy named ProtectionPolicy1 that has the following settings: Protected apps: App1 Exempt apps: App2 Windows Information Protection mode: Block You apply ProtectionPolicy1 to Group1 and Group3. You exclude Group2 from ProtectionPolicy1. For each of the following statements, check the box if the statement is true.`,
      referencesHtml: `<p>Since User2 is a member of Group2 and Group2 is excluded from the policy User2 can copy data from App1 to App3.</p>
<p>Since App2 is exempt from the policy User1 can copy data from App1 to App2.</p>
<p>Since User1 is a member of Group1 and Group1 is included in the app protection policy and User1 is not a member of Group2. And since App1 is protected by the app protection policy and is App3 is not exempt User1 cannot copy data from App1 to App3.</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Restricting-and-managing-apps-on-user-devices-62t_7oiZx" target="_blank">https://www.gitbit.org/course/ms-500/learn/Restricting-and-managing-apps-on-user-devices-62t_7oiZx</a></p>
`,
      selectedAnswer: [],
      answerShown: false,
      questionsShown: false,
      endExamShown: false,
      endExamText: 'Are you sure you want to end the exam?'
    }

    this.state.jsonLd = {
      datePublished: '9-8-2021',
      keywords: [
  			"Microsoft",
  			"Microsoft 365",
  			"Office 365",
        'MS-500',
        'Microsoft 365 Security Administration'
  		],
      mainEntity: {
        '@type': "Question",
        name: this.state.questionText.substring(0, 150),
        text: this.state.questionText,
        answerCount: this.state.question.answers ? this.state.question.answers.length : 0,
        dateCreated: "2021-09-08T16:52:31Z",
        author: {
          "@type": "Person",
          "name": "John Gruber",
          url: 'https://medium.com/@gruberjl'
        }
      }
    }

    if (this.state.question.answers) {
      this.state.jsonLd.mainEntity.acceptedAnswer = {
        "@type": "Answer",
        "text": this.state.question.answers ? this.state.question.answers.filter(answer => answer.isCorrectAnswer).map(a => a.value).join('; ') : 'None',
        author: {
          type: 'Person',
          name: 'John Gruber',
          url: 'https://medium.com/@gruberjl'
        },
        upvoteCount: 1,
        dateCreated: "2021-09-08T16:52:31Z"
      }
    }
  }

  componentDidMount() {
    if (isBrowser()) {
      this.onAuthStateChangedListener = onAuthStateChanged(this.setUid)
    }
  }

  componentWillUnmount() {
    this.onAuthStateChangedListener()
  }

  setUid(user) {
    if (user) {
      this.setState({
        uid: user.uid
      })

      if (this.state.testId) {
        getDoc(`users/${this.state.uid}/tests`, this.state.testId).then(test => {
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

          getDoc(`Tests/MS-500/Questions`, currentQuestion.id).then(question => {
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
        getDoc(`Tests/MS-500/Questions`, this.state.questionId).then(question => {
          const questionHtml = draftToHtml(question.question)
          const referencesHtml = draftToHtml(question.references)
          this.setState({question, questionHtml, referencesHtml})
        })
      }
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

    if (this.state.testId) {
      const test = Object.assign({}, this.state.test)

      test.questions = test.questions.map(question => {
        if (question.id === this.state.questionId) {
          question.answered = selectedAnswer
        }
        return question
      })

      saveDoc(`users/${this.state.uid}/tests`, test)

      this.setState({test})
    }
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

    saveDoc(`users/${this.state.uid}/tests`, test).then(() => {
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
      <Page jsonLdType={'QAPage'} jsonLd={this.state.jsonLd} title={this.state.questionText} description={this.state.questionText}>
        <main>
          <div>
            <Container>
              <Row>
                <Col md={6} xs={12} lg={8}><h1>Question {this.state.questionIdx}</h1></Col>
                <Col md={6} xs={12} lg={4} className='flex-space-between'> {
                  this.state.previousQuestionId !== '' ?
                    <Button as={Link} to={`/course/ms-500/question/${this.state.previousQuestionId}?testId=${this.state.testId}`}>Previous Question</Button> :
                    ''
                  }
                  {
                    this.state.nextQuestionId !== '' ?
                      <Button as={Link} to={`/course/ms-500/question/${this.state.nextQuestionId}?testId=${this.state.testId}`}>Next Question</Button> : (
                          this.state.testId ?
                            <Button onClick={this.toggleEndExam} variant="warning">End Exam</Button> :
                            ''
                      )

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
              <Row className='align-right'><Col md={6} xs={12} lg={8}></Col>
              <Col md={6} xs={12} lg={4} className='flex-space-between'> {
                  this.state.previousQuestionId !== '' ?
                    <Button as={Link} to={`/course/ms-500/question/${this.state.previousQuestionId}?testId=${this.state.testId}`}>Previous Question</Button> :
                    ''
                  }
                {
                  this.state.nextQuestionId !== '' ?
                    <Button as={Link} to={`/course/ms-500/question/${this.state.nextQuestionId}?testId=${this.state.testId}`}>Next Question</Button> :
                    this.state.testId ?
                      <Button onClick={this.toggleEndExam} variant="warning">End Exam</Button> :
                      ''
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
                { this.state.testId ?
                  <Col xs={12} md={6} className='align-right'>
                    <Button onClick={this.toggleShowQuestions} style={bottomButtonStyle}>
                      { this.state.questionsShown ?
                        <span>Hide Question List</span> :
                        <span>Show Question List</span>
                      }
                    </Button>
                  </Col> :
                  ''
                }
              </Row>
              { this.state.testId ?
                <Row>
                  <Col className='align-right'>
                    <Button onClick={this.toggleEndExam} variant="warning" style={bottomButtonStyle}>End Exam</Button>
                  </Col>
                </Row> :
                ''
              }
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
