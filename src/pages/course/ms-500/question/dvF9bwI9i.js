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
      question: {"answers":[{"value":"131.107.83.0/28","isCorrectAnswer":true},{"isCorrectAnswer":false,"value":"192.168.16.0/20"},{"isCorrectAnswer":false,"value":"172.16.0.0/24"},{"value":"192.168.0.0/20","isCorrectAnswer":false}],"id":"dvF9bwI9i","question":{"blocks":[{"key":"f01np","depth":0,"text":"Internal Network Infrastructure -","type":"unstyled","entityRanges":[],"data":{},"inlineStyleRanges":[{"length":33,"style":"BOLD","offset":0}]},{"data":{},"key":"1linq","entityRanges":[],"text":"The network contains a single domain forest. The forest functional level is Windows Server 2016.","depth":0,"inlineStyleRanges":[],"type":"unstyled"},{"data":{},"entityRanges":[],"inlineStyleRanges":[],"text":"Users are subject to sign-in hour restrictions as defined in Active Directory.","key":"3kajh","type":"unstyled","depth":0},{"depth":0,"key":"dbesd","text":"The network has the IP address ranges shown in the following table.","inlineStyleRanges":[],"data":{},"entityRanges":[],"type":"unstyled"},{"data":{},"type":"atomic","text":" ","entityRanges":[{"offset":0,"key":0,"length":1}],"inlineStyleRanges":[],"depth":0,"key":"9m2gt"},{"text":"Security Requirements - Multi-factor authentication (MFA) Requirements","data":{},"inlineStyleRanges":[{"length":70,"offset":0,"style":"BOLD"}],"key":"dj2i8","depth":0,"entityRanges":[],"type":"unstyled"},{"entityRanges":[],"key":"314k9","data":{},"type":"unordered-list-item","inlineStyleRanges":[],"depth":0,"text":"Security features of Microsoft Office 365 and Azure will be tested by using pilot Azure user accounts."},{"key":"1r75r","depth":0,"type":"unordered-list-item","entityRanges":[],"inlineStyleRanges":[],"text":"You identify the following requirements for testing MFA:","data":{}},{"type":"unordered-list-item","entityRanges":[],"text":"Pilot users must use MFA unless they are signing in from the internal network of the Chicago office. MFA must NOT be used on the Chicago office internal network.","depth":0,"inlineStyleRanges":[],"key":"70n98","data":{}},{"text":"If an authentication attempt is suspicious, MFA must be used, regardless of the user location.","entityRanges":[],"key":"6u08o","depth":0,"type":"unordered-list-item","inlineStyleRanges":[],"data":{}},{"inlineStyleRanges":[],"key":"6vknc","data":{},"type":"unordered-list-item","entityRanges":[],"depth":0,"text":"Any disruption of legitimate authentication attempts must be minimized."},{"inlineStyleRanges":[],"depth":0,"key":"5rj92","type":"unstyled","entityRanges":[],"data":{},"text":"Which IP address space should you include in the Trusted IP MFA configuration?"}],"entityMap":{"0":{"mutability":"MUTABLE","type":"IMAGE","data":{"alignment":"left","width":"auto","height":"auto","src":"https://i.ibb.co/9rgYK1j/location-chart.png","alt":"Location chart"}}}},"references":{"entityMap":{"0":{"data":{"targetOption":"_blank","url":"https://www.gitbit.org/course/ms-500/learn/The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk"},"mutability":"MUTABLE","type":"LINK"},"1":{"data":{"targetOption":"_blank","url":"https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-mfasettings#trusted-ips"},"type":"LINK","mutability":"MUTABLE"}},"blocks":[{"key":"4eaep","type":"unstyled","depth":0,"entityRanges":[],"data":{},"inlineStyleRanges":[],"text":"You'll need to exclude the external network also known as the public IP address."},{"inlineStyleRanges":[],"data":{},"depth":0,"text":"https://www.gitbit.org/course/ms-500/learn/The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","entityRanges":[{"length":128,"offset":0,"key":0}],"key":"fbnj5","type":"unstyled"},{"inlineStyleRanges":[],"type":"unstyled","data":{},"entityRanges":[{"length":104,"offset":0,"key":1}],"depth":0,"text":"https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-mfasettings#trusted-ips","key":"a13ld"}]}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'dvF9bwI9i',
      questionIdx: '',
      questionHtml: `<p><strong>Internal Network Infrastructure -</strong></p>
<p>The network contains a single domain forest. The forest functional level is Windows Server 2016.</p>
<p>Users are subject to sign-in hour restrictions as defined in Active Directory.</p>
<p>The network has the IP address ranges shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/9rgYK1j/location-chart.png" alt="Location chart" style="height: auto;width: auto"/></div>
<p><strong>Security Requirements - Multi-factor authentication (MFA) Requirements</strong></p>
<ul>
<li>Security features of Microsoft Office 365 and Azure will be tested by using pilot Azure user accounts.</li>
<li>You identify the following requirements for testing MFA:</li>
<li>Pilot users must use MFA unless they are signing in from the internal network of the Chicago office. MFA must NOT be used on the Chicago office internal network.</li>
<li>If an authentication attempt is suspicious, MFA must be used, regardless of the user location.</li>
<li>Any disruption of legitimate authentication attempts must be minimized.</li>
</ul>
<p>Which IP address space should you include in the Trusted IP MFA configuration?</p>
`,
      questionText: `Internal Network Infrastructure - The network contains a single domain forest. The forest functional level is Windows Server 2016. Users are subject to sign-in hour restrictions as defined in Active Directory. The network has the IP address ranges shown in the following table. Security Requirements - Multi-factor authentication (MFA) Requirements Security features of Microsoft Office 365 and Azure will be tested by using pilot Azure user accounts. You identify the following requirements for testing MFA: Pilot users must use MFA unless they are signing in from the internal network of the Chicago office. MFA must NOT be used on the Chicago office internal network. If an authentication attempt is suspicious, MFA must be used, regardless of the user location. Any disruption of legitimate authentication attempts must be minimized. Which IP address space should you include in the Trusted IP MFA configuration?`,
      referencesHtml: `<p>You'll need to exclude the external network also known as the public IP address.</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk" target="_blank">https://www.gitbit.org/course/ms-500/learn/The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk</a></p>
<p><a href="https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-mfasettings#trusted-ips" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-mfasettings#trusted-ips</a></p>
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
