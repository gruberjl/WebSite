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
      question: {"answers":[{"isCorrectAnswer":true,"value":"A sales user who is logging in from the Montreal office will be prompted for MFA."},{"value":"A sales user who signs in from home with a public IP address of 193.77.140.140 will be prompted for MFA.","isCorrectAnswer":true},{"value":"A sales user who is logging in from the New York office will be prompted for Azure MFA credentials.","isCorrectAnswer":false}],"id":"PUWxVj7lH","question":{"blocks":[{"inlineStyleRanges":[],"type":"unstyled","data":{},"text":"Your organization has the offices in the following chart. Each office has the following IP addresses.","entityRanges":[],"key":"2qdub","depth":0},{"inlineStyleRanges":[],"depth":0,"data":{},"key":"5llr","text":" ","entityRanges":[{"key":0,"length":1,"offset":0}],"type":"atomic"},{"entityRanges":[],"depth":0,"text":"You've configured named locations in Azure AD as below.","inlineStyleRanges":[],"type":"unstyled","data":{},"key":"c07p6"},{"depth":0,"key":"a8u3o","type":"atomic","entityRanges":[{"length":1,"offset":0,"key":1}],"inlineStyleRanges":[],"data":{},"text":" "},{"inlineStyleRanges":[{"length":33,"offset":76,"style":"color-rgb(33,37,41)"},{"length":33,"offset":76,"style":"bgcolor-rgb(255,255,255)"},{"style":"fontsize-16","offset":76,"length":33},{"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", \"Liberation Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","offset":76,"length":33}],"data":{},"depth":0,"type":"unstyled","text":"An address space of 198.35.3.0/24 is defined in the trusted IPs list on the Multi-Factor Authentication page.","entityRanges":[],"key":"c772p"},{"type":"unstyled","inlineStyleRanges":[],"key":"8d983","data":{},"depth":0,"text":"MFA is enabled for the users in the sales department.","entityRanges":[]},{"key":"bcs2k","text":"You are evaluating which sales department users will be prompted for MFA.","depth":0,"data":{},"inlineStyleRanges":[],"type":"unstyled","entityRanges":[]},{"key":"99kqm","type":"unstyled","inlineStyleRanges":[],"entityRanges":[],"data":{},"text":"Check the box for each true statement.","depth":0}],"entityMap":{"0":{"type":"IMAGE","data":{"alt":"Chart of locations and IP addresses","width":"auto","height":"auto","alignment":"left","src":"https://i.ibb.co/tBQ9xgK/location-chart.png"},"mutability":"MUTABLE"},"1":{"mutability":"MUTABLE","data":{"src":"https://i.ibb.co/dJnwkFX/trusted-locations-chart.png","width":"auto","height":"auto","alignment":"left","alt":"Trusted Locations Chart"},"type":"IMAGE"}}},"references":{"entityMap":{"0":{"type":"LINK","data":{"url":"https://www.gitbit.org/course/ms-500/learn/Whats-a-conditional-access-policy-V1en9Iugh","targetOption":"_blank"},"mutability":"MUTABLE"},"1":{"mutability":"MUTABLE","type":"LINK","data":{"url":"https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/location-condition#:~:text=and%20IPv6%20addresses.-,Named%20locations,that%20you%20wish%20to%20block","targetOption":"_blank"}}},"blocks":[{"data":{},"key":"6icl3","depth":0,"type":"unstyled","entityRanges":[],"inlineStyleRanges":[],"text":"The only trusted IP address is the New York office. So sales users connecting from the New York office will not be prompted for MFA. All other users will be prompted for MFA."},{"type":"unstyled","text":"https://www.gitbit.org/course/ms-500/learn/Whats-a-conditional-access-policy-V1en9Iugh","key":"4236g","entityRanges":[{"length":86,"offset":0,"key":0}],"inlineStyleRanges":[],"depth":0,"data":{}},{"entityRanges":[{"offset":0,"length":175,"key":1}],"depth":0,"inlineStyleRanges":[],"text":"https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/location-condition#:~:text=and%20IPv6%20addresses.-,Named%20locations,that%20you%20wish%20to%20block","type":"unstyled","data":{},"key":"4al6p"}]}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'PUWxVj7lH',
      questionIdx: '',
      questionHtml: `<p>Your organization has the offices in the following chart. Each office has the following IP addresses.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/tBQ9xgK/location-chart.png" alt="Chart of locations and IP addresses" style="height: auto;width: auto"/></div>
<p>You've configured named locations in Azure AD as below.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/dJnwkFX/trusted-locations-chart.png" alt="Trusted Locations Chart" style="height: auto;width: auto"/></div>
<p>An address space of 198.35.3.0/24 is defined in the trusted IPs list on the <span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Multi-Factor Authentication page.</span></p>
<p>MFA is enabled for the users in the sales department.</p>
<p>You are evaluating which sales department users will be prompted for MFA.</p>
<p>Check the box for each true statement.</p>
`,
      questionText: `Your organization has the offices in the following chart. Each office has the following IP addresses. You've configured named locations in Azure AD as below. An address space of 198.35.3.0/24 is defined in the trusted IPs list on the Multi-Factor Authentication page. MFA is enabled for the users in the sales department. You are evaluating which sales department users will be prompted for MFA. Check the box for each true statement.`,
      referencesHtml: `<p>The only trusted IP address is the New York office. So sales users connecting from the New York office will not be prompted for MFA. All other users will be prompted for MFA.</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Whats-a-conditional-access-policy-V1en9Iugh" target="_blank">https://www.gitbit.org/course/ms-500/learn/Whats-a-conditional-access-policy-V1en9Iugh</a></p>
<p><a href="https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/location-condition#:~:text=and%20IPv6%20addresses.-,Named%20locations,that%20you%20wish%20to%20block" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/location-condition#:~:text=and%20IPv6%20addresses.-,Named%20locations,that%20you%20wish%20to%20block</a></p>
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
        url: 'https://www.gitbit.org/course/ms-500/question/PUWxVj7lH',
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
