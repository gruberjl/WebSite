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
      question: {"answers":[{"isCorrectAnswer":false,"value":"Only employees who have an Azure AD user account"},{"value":"Employees who have an Azure AD user account or a synced on-premises account","isCorrectAnswer":true},{"value":"Only employees who have a synced on-premises account","isCorrectAnswer":false},{"isCorrectAnswer":false,"value":"Fix the synchronization server and install Azure AD Connect in staging mode"},{"isCorrectAnswer":true,"value":"Fix the synchronization server and install an additional authentication agent"},{"value":"Install an additional authentication agent and run the Start-ADSyncSyncCycle cmdlet","isCorrectAnswer":false},{"value":"Install Azure AD Connect in staging mode and run the Start-ADSyncSyncCycle cmdlet","isCorrectAnswer":false}],"id":"-7MLm8ziu","question":{"blocks":[{"key":"3l77q","type":"unstyled","data":{},"depth":0,"text":"Your network contains an on-premises Active Directory domain that syncs to Azure Active Directory (Azure AD) as shown in the following exhibit.","entityRanges":[],"inlineStyleRanges":[]},{"text":" ","data":{},"depth":0,"inlineStyleRanges":[],"key":"4tnb1","type":"atomic","entityRanges":[{"key":0,"length":1,"offset":0}]},{"key":"dv9ht","text":"The synchronization schedule is configured as shown in the following exhibit.","depth":0,"entityRanges":[],"data":{},"inlineStyleRanges":[],"type":"unstyled"},{"depth":0,"entityRanges":[{"key":1,"offset":0,"length":1}],"text":" ","key":"bm5re","data":{},"inlineStyleRanges":[],"type":"atomic"},{"text":"Which employees can authenticate by using Azure AD?","entityRanges":[],"type":"unstyled","depth":0,"inlineStyleRanges":[{"style":"color-rgb(80,80,80)","length":51,"offset":0},{"offset":0,"style":"bgcolor-rgb(255,255,255)","length":51},{"offset":0,"style":"fontsize-16","length":51},{"style":"fontfamily-Roboto Condensed\", sans-serif","length":51,"offset":0}],"key":"f2iao","data":{}},{"entityRanges":[],"inlineStyleRanges":[],"data":{},"type":"unstyled","depth":0,"key":"7q87t","text":"What should you do to remove the warning for pass-through authentication?"}],"entityMap":{"0":{"mutability":"MUTABLE","type":"IMAGE","data":{"alignment":"left","height":"auto","width":"auto","src":"https://i.ibb.co/VpsjVFh/ad-connect-setup.png","alt":"AD Connect Setup"}},"1":{"mutability":"MUTABLE","type":"IMAGE","data":{"width":"auto","alignment":"left","src":"https://i.ibb.co/CWcS1NP/ad-connect-status.png","height":"auto","alt":"AD Connect Scheduler status"}}}},"references":{"blocks":[{"data":{},"depth":0,"text":"Users that have an Azure AD user account or a synced on-premises account can both authenticate. (Pass-through authentication does not affect cloud-only accounts)","entityRanges":[],"inlineStyleRanges":[],"type":"unstyled","key":"fdm35"},{"depth":0,"key":"88p1k","inlineStyleRanges":[],"text":"The yellow exclamation mark is Microsoft warning you that you should have at least 2 pass-through authentication agents (in case one server fails).","entityRanges":[],"data":{},"type":"unstyled"},{"entityRanges":[],"key":"ftho5","text":"There's also an issue with the synchronization server because the last sync time is 4 hours. A sync should run every 30 minutes.","depth":0,"data":{},"type":"unstyled","inlineStyleRanges":[]},{"depth":0,"entityRanges":[{"length":69,"offset":0,"key":0}],"type":"unstyled","inlineStyleRanges":[],"data":{},"text":"https://www.gitbit.org/course/ms-500/learn/Whats-AD-Connect-ky5W0Lz5P","key":"e66bb"}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://www.gitbit.org/course/ms-500/learn/Whats-AD-Connect-ky5W0Lz5P","targetOption":"_blank"}}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: '-7MLm8ziu',
      questionIdx: '',
      questionHtml: `<p>Your network contains an on-premises Active Directory domain that syncs to Azure Active Directory (Azure AD) as shown in the following exhibit.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/VpsjVFh/ad-connect-setup.png" alt="AD Connect Setup" style="height: auto;width: auto"/></div>
<p>The synchronization schedule is configured as shown in the following exhibit.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/CWcS1NP/ad-connect-status.png" alt="AD Connect Scheduler status" style="height: auto;width: auto"/></div>
<p><span style="color: rgb(80,80,80);background-color: rgb(255,255,255);font-size: 16px;font-family: Roboto Condensed", sans-serif;">Which employees can authenticate by using Azure AD?</span></p>
<p>What should you do to remove the warning for pass-through authentication?</p>
`,
      questionText: `Your network contains an on-premises Active Directory domain that syncs to Azure Active Directory (Azure AD) as shown in the following exhibit. The synchronization schedule is configured as shown in the following exhibit. Which employees can authenticate by using Azure AD? What should you do to remove the warning for pass-through authentication?`,
      referencesHtml: `<p>Users that have an Azure AD user account or a synced on-premises account can both authenticate. (Pass-through authentication does not affect cloud-only accounts)</p>
<p>The yellow exclamation mark is Microsoft warning you that you should have at least 2 pass-through authentication agents (in case one server fails).</p>
<p>There's also an issue with the synchronization server because the last sync time is 4 hours. A sync should run every 30 minutes.</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Whats-AD-Connect-ky5W0Lz5P" target="_blank">https://www.gitbit.org/course/ms-500/learn/Whats-AD-Connect-ky5W0Lz5P</a></p>
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
        url: 'https://www.gitbit.org/course/ms-500/question/-7MLm8ziu',
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
