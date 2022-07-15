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
      question: {"answers":[{"value":"From Device2, User2 can copy data from AppA to AppC","isCorrectAnswer":true},{"value":"From Device2, User1 can copy data from AppA to AppB","isCorrectAnswer":true},{"value":"From Device2, User1 can copy data from AppA to AppC","isCorrectAnswer":false}],"id":"kFwtQkqEy","question":{"entityMap":{"0":{"type":"IMAGE","data":{"src":"https://i.ibb.co/KxwDstM/user-group.png","alignment":"left","width":"auto","height":"auto","alt":"User Group membership chart"},"mutability":"MUTABLE"},"1":{"data":{"alt":"Device chart","src":"https://i.ibb.co/c6d1kCM/device-chart.png","width":"auto","height":"auto","alignment":"left"},"mutability":"MUTABLE","type":"IMAGE"}},"blocks":[{"text":"Your organization has a Microsoft 365 tenant with a default domain of gitbit.org","entityRanges":[],"depth":0,"key":"1jrtu","inlineStyleRanges":[],"data":{},"type":"unstyled"},{"entityRanges":[],"depth":0,"data":{},"key":"2p5f2","inlineStyleRanges":[],"type":"unstyled","text":"Your organization's Azure AD contains the following users."},{"entityRanges":[{"key":0,"offset":0,"length":1}],"data":{},"depth":0,"inlineStyleRanges":[],"text":" ","type":"atomic","key":"5mpad"},{"data":{},"depth":0,"inlineStyleRanges":[],"entityRanges":[],"type":"unstyled","key":"abq0p","text":"Your organization's Microsoft Endpoint Manager admin center shows the following devices enrolled."},{"entityRanges":[{"length":1,"key":1,"offset":0}],"text":" ","data":{},"key":"55lm4","type":"atomic","inlineStyleRanges":[],"depth":0},{"key":"doaun","entityRanges":[],"data":{},"inlineStyleRanges":[],"text":"Both devices have three apps named AppA, AppB, and AppC installed.","type":"unstyled","depth":0},{"entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"depth":0,"text":"You create an app protection policy named ProtectionPolicyA that has the following settings:","key":"4p6gt","data":{}},{"depth":0,"text":"Protected apps: AppA","type":"unordered-list-item","inlineStyleRanges":[],"entityRanges":[],"data":{},"key":"5betb"},{"depth":0,"type":"unordered-list-item","key":"ai8uj","text":"Exempt apps: AppB","data":{},"entityRanges":[],"inlineStyleRanges":[]},{"type":"unordered-list-item","key":"2mjj5","text":"Windows Information Protection mode: Block","inlineStyleRanges":[],"data":{},"entityRanges":[],"depth":0},{"type":"unstyled","data":{},"key":"bnbu5","depth":0,"inlineStyleRanges":[],"text":"You apply ProtectionPolicyA to Group1 and Group3. You exclude Group2 from ProtectionPolicyA.","entityRanges":[]},{"type":"unstyled","text":"Check the box next to each true statement","data":{},"depth":0,"key":"1u2nf","inlineStyleRanges":[],"entityRanges":[]}]},"references":{"blocks":[{"data":{},"entityRanges":[],"text":"Since User2 is a member of Group2 and Group2 is excluded from the policy User2 can copy data from AppA to AppC.","key":"copgf","depth":0,"type":"unstyled","inlineStyleRanges":[]},{"depth":0,"inlineStyleRanges":[],"type":"unstyled","entityRanges":[],"key":"4l7r0","data":{},"text":"Since AppB is exempt from the policy User1 can copy data from AppA to AppB."},{"type":"unstyled","inlineStyleRanges":[],"key":"dhmt3","depth":0,"text":"Since User1 is a member of Group1 and Group1 is included in the app protection policy and User1 is not a member of Group2. And since AppA is protected by the app protection policy and AppC is not exempt User1 cannot copy data from AppA to AppC.","entityRanges":[],"data":{}},{"depth":0,"entityRanges":[{"key":0,"length":98,"offset":0}],"type":"unstyled","inlineStyleRanges":[],"data":{},"key":"c7d6c","text":"https://www.gitbit.org/course/ms-500/learn/Restricting-and-managing-apps-on-user-devices-62t_7oiZx"}],"entityMap":{"0":{"data":{"url":"https://www.gitbit.org/course/ms-500/learn/Restricting-and-managing-apps-on-user-devices-62t_7oiZx","targetOption":"_blank"},"mutability":"MUTABLE","type":"LINK"}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'kFwtQkqEy',
      questionIdx: '',
      questionHtml: `<p>Your organization has a Microsoft 365 tenant with a default domain of gitbit.org</p>
<p>Your organization's Azure AD contains the following users.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/KxwDstM/user-group.png" alt="User Group membership chart" style="height: auto;width: auto"/></div>
<p>Your organization's Microsoft Endpoint Manager admin center shows the following devices enrolled.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/c6d1kCM/device-chart.png" alt="Device chart" style="height: auto;width: auto"/></div>
<p>Both devices have three apps named AppA, AppB, and AppC installed.</p>
<p>You create an app protection policy named ProtectionPolicyA that has the following settings:</p>
<ul>
<li>Protected apps: AppA</li>
<li>Exempt apps: AppB</li>
<li>Windows Information Protection mode: Block</li>
</ul>
<p>You apply ProtectionPolicyA to Group1 and Group3. You exclude Group2 from ProtectionPolicyA.</p>
<p>Check the box next to each true statement</p>
`,
      questionText: `Your organization has a Microsoft 365 tenant with a default domain of gitbit.org Your organization's Azure AD contains the following users. Your organization's Microsoft Endpoint Manager admin center shows the following devices enrolled. Both devices have three apps named AppA, AppB, and AppC installed. You create an app protection policy named ProtectionPolicyA that has the following settings: Protected apps: AppA Exempt apps: AppB Windows Information Protection mode: Block You apply ProtectionPolicyA to Group1 and Group3. You exclude Group2 from ProtectionPolicyA. Check the box next to each true statement`,
      referencesHtml: `<p>Since User2 is a member of Group2 and Group2 is excluded from the policy User2 can copy data from AppA to AppC.</p>
<p>Since AppB is exempt from the policy User1 can copy data from AppA to AppB.</p>
<p>Since User1 is a member of Group1 and Group1 is included in the app protection policy and User1 is not a member of Group2. And since AppA is protected by the app protection policy and AppC is not exempt User1 cannot copy data from AppA to AppC.</p>
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
        url: 'https://www.gitbit.org/course/ms-500/question/kFwtQkqEy',
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
