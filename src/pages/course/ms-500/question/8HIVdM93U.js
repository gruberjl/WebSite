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
      question: {"answers":[{"value":"Change the Assignment Type for Admin2 to Permanent","isCorrectAnswer":false},{"isCorrectAnswer":false,"value":"From the Azure Active Directory admin center, assign the Exchange administrator role to Admin2"},{"value":"From the Azure Active Directory admin center, remove the Exchange administrator role to Admin1","isCorrectAnswer":false},{"value":"Change the Assignment Type for Admin1 to Eligible","isCorrectAnswer":true}],"id":"8HIVdM93U","question":{"blocks":[{"text":"Fabrikam identifies the following security requirements:","entityRanges":[],"key":"376vd","data":{},"depth":0,"inlineStyleRanges":[],"type":"unstyled"},{"inlineStyleRanges":[],"type":"unordered-list-item","data":{},"entityRanges":[],"depth":0,"key":"5f2ru","text":"Access to the Azure Active Directory admin center by the user administrators must be reviewed every seven days. If an administrator fails to respond to an access request within three days, access must be removed"},{"entityRanges":[],"inlineStyleRanges":[],"type":"unordered-list-item","depth":0,"key":"7oc0n","text":"Users who manage Microsoft 365 workloads must only be allowed to perform administrative tasks for up to three hours at a time. Global administrators must be exempt from this requirement","data":{}},{"data":{},"entityRanges":[],"inlineStyleRanges":[],"key":"bo064","type":"unordered-list-item","text":"Users must be prevented from inviting external users to view company data. Only global administrators and a user named User1 must be able to send invitations","depth":0},{"depth":0,"entityRanges":[],"inlineStyleRanges":[],"type":"unordered-list-item","text":"Azure Advanced Threat Protection (ATP) must capture security group modifications for sensitive groups, such as Domain Admins in Active Directory","data":{},"key":"bq41i"},{"text":"Workload administrators must use multi-factor authentication (MFA) when signing in from an anonymous or an unfamiliar location","depth":0,"data":{},"entityRanges":[],"type":"unordered-list-item","inlineStyleRanges":[],"key":"8jnbt"},{"depth":0,"data":{},"key":"fkpir","inlineStyleRanges":[],"text":"The location of the user administrators must be audited when the administrators authenticate to Azure AD","entityRanges":[],"type":"unordered-list-item"},{"entityRanges":[],"key":"3knma","data":{},"text":"Email messages that include attachments containing malware must be delivered without the attachment","inlineStyleRanges":[],"depth":0,"type":"unordered-list-item"},{"text":"The principle of least privilege must be used whenever possible","depth":0,"type":"unordered-list-item","data":{},"entityRanges":[],"inlineStyleRanges":[],"key":"4habl"},{"text":"An administrator configures Azure AD Privileged Identity Management as shown in the following exhibit.","inlineStyleRanges":[],"type":"unstyled","depth":0,"key":"stm8","data":{},"entityRanges":[]},{"inlineStyleRanges":[],"data":{},"text":" ","type":"atomic","entityRanges":[{"length":1,"key":0,"offset":0}],"depth":0,"key":"1b5s7"},{"key":"a2q2u","data":{},"entityRanges":[],"inlineStyleRanges":[],"type":"unstyled","depth":0,"text":""},{"key":"14f2n","text":" ","type":"atomic","data":{},"entityRanges":[{"key":1,"length":1,"offset":0}],"inlineStyleRanges":[],"depth":0},{"key":"dsva5","text":"What should you do to meet the security requirements?","data":{},"entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"depth":0}],"entityMap":{"0":{"type":"IMAGE","data":{"alt":"Active Assignments","height":"auto","width":"auto","src":"https://i.ibb.co/5cPfF5D/Active-Assignments.png","alignment":"left"},"mutability":"MUTABLE"},"1":{"type":"IMAGE","mutability":"MUTABLE","data":{"alt":"Eligible Assignments","alignment":"left","src":"https://i.ibb.co/N609WF4/Eligible-Assignments.png","height":"auto","width":"auto"}}}},"references":{"blocks":[{"depth":0,"type":"unstyled","key":"dctl8","data":{},"entityRanges":[],"text":"To fulfill the security requirement \"Users who manage Microsoft 365 workloads must only be allowed to perform administrative tasks for up to three hours at a time.\" the user accounts should not say Permanent in the End time.","inlineStyleRanges":[{"length":126,"style":"color-rgb(33,37,41)","offset":37},{"offset":37,"style":"bgcolor-rgb(255,255,255)","length":126},{"length":126,"offset":37,"style":"fontsize-16"},{"length":126,"offset":37,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"}]},{"type":"unstyled","text":"https://www.gitbit.org/course/ms-500/learn/Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","data":{},"inlineStyleRanges":[],"depth":0,"entityRanges":[{"length":124,"offset":0,"key":0}],"key":"8hpni"}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://www.gitbit.org/course/ms-500/learn/Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s","targetOption":"_blank"}}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: '8HIVdM93U',
      questionIdx: '',
      questionHtml: `<p>Fabrikam identifies the following security requirements:</p>
<ul>
<li>Access to the Azure Active Directory admin center by the user administrators must be reviewed every seven days. If an administrator fails to respond to an access request within three days, access must be removed</li>
<li>Users who manage Microsoft 365 workloads must only be allowed to perform administrative tasks for up to three hours at a time. Global administrators must be exempt from this requirement</li>
<li>Users must be prevented from inviting external users to view company data. Only global administrators and a user named User1 must be able to send invitations</li>
<li>Azure Advanced Threat Protection (ATP) must capture security group modifications for sensitive groups, such as Domain Admins in Active Directory</li>
<li>Workload administrators must use multi-factor authentication (MFA) when signing in from an anonymous or an unfamiliar location</li>
<li>The location of the user administrators must be audited when the administrators authenticate to Azure AD</li>
<li>Email messages that include attachments containing malware must be delivered without the attachment</li>
<li>The principle of least privilege must be used whenever possible</li>
</ul>
<p>An administrator configures Azure AD Privileged Identity Management as shown in the following exhibit.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/5cPfF5D/Active-Assignments.png" alt="Active Assignments" style="height: auto;width: auto"/></div>
<p></p>
<div style="text-align:left;"><img src="https://i.ibb.co/N609WF4/Eligible-Assignments.png" alt="Eligible Assignments" style="height: auto;width: auto"/></div>
<p>What should you do to meet the security requirements?</p>
`,
      questionText: `Fabrikam identifies the following security requirements: Access to the Azure Active Directory admin center by the user administrators must be reviewed every seven days. If an administrator fails to respond to an access request within three days, access must be removed Users who manage Microsoft 365 workloads must only be allowed to perform administrative tasks for up to three hours at a time. Global administrators must be exempt from this requirement Users must be prevented from inviting external users to view company data. Only global administrators and a user named User1 must be able to send invitations Azure Advanced Threat Protection (ATP) must capture security group modifications for sensitive groups, such as Domain Admins in Active Directory Workload administrators must use multi-factor authentication (MFA) when signing in from an anonymous or an unfamiliar location The location of the user administrators must be audited when the administrators authenticate to Azure AD Email messages that include attachments containing malware must be delivered without the attachment The principle of least privilege must be used whenever possible An administrator configures Azure AD Privileged Identity Management as shown in the following exhibit. What should you do to meet the security requirements?`,
      referencesHtml: `<p>To fulfill the security requirement "<span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Users who manage Microsoft 365 workloads must only be allowed to perform administrative tasks for up to three hours at a time.</span>" the user accounts should not say Permanent in the End time.</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s" target="_blank">https://www.gitbit.org/course/ms-500/learn/Just-in-time-approval-and-notification-for-admin-roles-in-Microsoft-365-RHW1API2s</a></p>
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
