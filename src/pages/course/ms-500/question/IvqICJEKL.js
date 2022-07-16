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
      question: {"answers":[{"isCorrectAnswer":false,"value":"If UserA uses DeviceA, PolicyC applies"},{"value":"When UserB uses DeviceA, PolicyB applies","isCorrectAnswer":true},{"value":"When UserB uses DeviceB, PolicyD applies","isCorrectAnswer":false}],"id":"IvqICJEKL","question":{"blocks":[{"depth":0,"data":{},"type":"unstyled","inlineStyleRanges":[],"text":"Your organization has a Microsoft 365 tenant named GitBit.org that contains the following users.","key":"1v5dd","entityRanges":[]},{"inlineStyleRanges":[],"text":" ","entityRanges":[{"offset":0,"length":1,"key":0}],"data":{},"key":"c346s","depth":0,"type":"atomic"},{"type":"unstyled","data":{},"inlineStyleRanges":[],"entityRanges":[],"depth":0,"text":"Your organization has registered the following devices in Azure AD.","key":"5k82i"},{"data":{},"inlineStyleRanges":[],"depth":0,"key":"970fs","text":" ","type":"atomic","entityRanges":[{"length":1,"key":1,"offset":0}]},{"inlineStyleRanges":[],"key":"8vtdt","depth":0,"text":"You create the app protection policies in the Microsoft Endpoint Manager admin center as shown below.","entityRanges":[],"type":"unstyled","data":{}},{"entityRanges":[{"key":2,"length":1,"offset":0}],"type":"atomic","inlineStyleRanges":[],"depth":0,"text":" ","data":{},"key":"e5k92"},{"inlineStyleRanges":[],"entityRanges":[],"type":"unstyled","depth":0,"data":{},"key":"8cifv","text":"Check the box next to each true statement below."}],"entityMap":{"0":{"mutability":"MUTABLE","type":"IMAGE","data":{"alt":"Chart showing 2 users with their group membership","height":"auto","alignment":"left","src":"https://i.ibb.co/Lk75D86/user-and-group-membership.png","width":"auto"}},"1":{"type":"IMAGE","data":{"src":"https://i.ibb.co/cTP8vKV/device-chart.png","alignment":"left","width":"auto","alt":"Chart showing devices, platform, and membership","height":"auto"},"mutability":"MUTABLE"},"2":{"mutability":"MUTABLE","data":{"width":"auto","src":"https://i.ibb.co/GnwXkhx/App-Protection-Policies-Assignment.png","alignment":"left","height":"auto","alt":"Chart showing the app protection policies and their assignments"},"type":"IMAGE"},"3":{"mutability":"MUTABLE","type":"IMAGE","data":{"height":"auto","alt":"Policy Chart","alignment":"left","width":"auto","src":"https://i.ibb.co/JC9cYZS/policy-chart.png"}}}},"references":{"blocks":[{"key":"4pcat","depth":0,"data":{},"inlineStyleRanges":[],"entityRanges":[],"type":"unstyled","text":"Since PolicyC applies to iOS and DeviceA is a Windows 10 device PolicyC does not apply."},{"inlineStyleRanges":[],"key":"6gnh7","type":"unstyled","depth":0,"text":"Since UserB is a member of GroupB and PolicyB does apply to Windows 10 devices, PolicyB applies to UserB on DeviceA.","data":{},"entityRanges":[]},{"depth":0,"data":{},"inlineStyleRanges":[],"entityRanges":[],"key":"dkqsg","type":"unstyled","text":"UserB isn't a member of GroupB and since you need to have users as part of the protected group PolicyD does not apply to DeviceB / UserB."},{"key":"7eipd","data":{},"text":"https://www.gitbit.org/course/ms-500/learn/Restricting-and-managing-apps-on-user-devices-62t_7oiZx","depth":0,"inlineStyleRanges":[],"entityRanges":[{"length":98,"offset":0,"key":0}],"type":"unstyled"},{"text":"https://docs.microsoft.com/en-us/intune/apps/app-protection-policy","data":{},"depth":0,"inlineStyleRanges":[],"key":"d8arv","entityRanges":[{"key":1,"offset":0,"length":66}],"type":"unstyled"}],"entityMap":{"0":{"data":{"targetOption":"_blank","url":"https://www.gitbit.org/course/ms-500/learn/Restricting-and-managing-apps-on-user-devices-62t_7oiZx"},"type":"LINK","mutability":"MUTABLE"},"1":{"type":"LINK","data":{"targetOption":"_blank","url":"https://docs.microsoft.com/en-us/intune/apps/app-protection-policy"},"mutability":"MUTABLE"}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'IvqICJEKL',
      questionIdx: '',
      questionHtml: `<p>Your organization has a Microsoft 365 tenant named GitBit.org that contains the following users.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/Lk75D86/user-and-group-membership.png" alt="Chart showing 2 users with their group membership" style="height: auto;width: auto"/></div>
<p>Your organization has registered the following devices in Azure AD.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/cTP8vKV/device-chart.png" alt="Chart showing devices, platform, and membership" style="height: auto;width: auto"/></div>
<p>You create the app protection policies in the Microsoft Endpoint Manager admin center as shown below.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/GnwXkhx/App-Protection-Policies-Assignment.png" alt="Chart showing the app protection policies and their assignments" style="height: auto;width: auto"/></div>
<p>Check the box next to each true statement below.</p>
`,
      questionText: `Your organization has a Microsoft 365 tenant named GitBit.org that contains the following users. Your organization has registered the following devices in Azure AD. You create the app protection policies in the Microsoft Endpoint Manager admin center as shown below. Check the box next to each true statement below.`,
      referencesHtml: `<p>Since PolicyC applies to iOS and DeviceA is a Windows 10 device PolicyC does not apply.</p>
<p>Since UserB is a member of GroupB and PolicyB does apply to Windows 10 devices, PolicyB applies to UserB on DeviceA.</p>
<p>UserB isn't a member of GroupB and since you need to have users as part of the protected group PolicyD does not apply to DeviceB / UserB.</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Restricting-and-managing-apps-on-user-devices-62t_7oiZx" target="_blank">https://www.gitbit.org/course/ms-500/learn/Restricting-and-managing-apps-on-user-devices-62t_7oiZx</a></p>
<p><a href="https://docs.microsoft.com/en-us/intune/apps/app-protection-policy" target="_blank">https://docs.microsoft.com/en-us/intune/apps/app-protection-policy</a></p>
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
        url: 'https://www.gitbit.org/course/ms-500/question/IvqICJEKL',
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
