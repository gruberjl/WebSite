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
      question: {"answers":[{"isCorrectAnswer":false,"value":"John Gruber receives 3 email alerts from Azure AD Identity Protection"},{"isCorrectAnswer":false,"value":"User2 receives 3 email alerts from Azure AD Identity Protection"},{"isCorrectAnswer":false,"value":"User3 receives 2 email alerts from Azure AD Identity Protection"}],"id":"vxLbzynWU","question":{"entityMap":{"0":{"mutability":"MUTABLE","type":"IMAGE","data":{"alt":"Users at Risk screenshot","alignment":"left","height":"auto","width":"auto","src":"https://i.ibb.co/RTNLdyM/Users-At-Risk.png"}},"1":{"type":"IMAGE","mutability":"MUTABLE","data":{"height":"auto","alignment":"left","src":"https://i.ibb.co/wzLBtGJ/user-role-chart.png","width":"auto","alt":"User role chart"}},"2":{"mutability":"MUTABLE","data":{"width":"auto","alignment":"left","height":"auto","alt":"User RIsk Chart","src":"https://i.ibb.co/dDHb6VK/user-risk-chart.png"},"type":"IMAGE"}},"blocks":[{"key":"957rl","text":"You have a Microsoft 365 E5 subscription that contains an Azure Active Directory (Azure AD) tenant named gitbit.org.","data":{},"depth":0,"entityRanges":[],"type":"unstyled","inlineStyleRanges":[]},{"text":"Azure AD Identity Protection alerts for gitbit.org are configured as shown in the following exhibit.","key":"8uunj","entityRanges":[],"data":{},"type":"unstyled","depth":0,"inlineStyleRanges":[]},{"text":" ","key":"d1p7o","entityRanges":[{"offset":0,"length":1,"key":0}],"data":{},"depth":0,"inlineStyleRanges":[],"type":"atomic"},{"key":"deom4","inlineStyleRanges":[],"entityRanges":[],"type":"unstyled","depth":0,"text":"A user named John Gruber is configured to receive alerts from Azure AD Identity Protection.","data":{}},{"data":{},"type":"unstyled","depth":0,"inlineStyleRanges":[],"text":"You create users in gitbit.org as shown in the following table.","key":"c9k4u","entityRanges":[]},{"data":{},"key":"bd174","inlineStyleRanges":[],"depth":0,"type":"atomic","entityRanges":[{"offset":0,"length":1,"key":1}],"text":" "},{"key":"10fuk","data":{},"entityRanges":[],"depth":0,"type":"unstyled","inlineStyleRanges":[],"text":"The users perform the sign-ins shown in the following table."},{"inlineStyleRanges":[],"data":{},"type":"atomic","key":"1pjgg","depth":0,"text":" ","entityRanges":[{"length":1,"key":2,"offset":0}]},{"data":{},"depth":0,"key":"6nlr4","entityRanges":[],"type":"unstyled","text":"For each of the following statements, click the checkbox if the statement is true.","inlineStyleRanges":[]}]},"references":{"blocks":[{"inlineStyleRanges":[{"style":"BOLD","length":9,"offset":0}],"depth":0,"data":{},"text":"Box 1: No","type":"unstyled","entityRanges":[],"key":"b4n82"},{"inlineStyleRanges":[],"text":"User1 will receive the two alerts classified as medium or higher.","key":"a4q6n","entityRanges":[],"data":{},"depth":0,"type":"unstyled"},{"text":"Sign-ins from an infected device are classified as low. This risk detection identifies IP addresses, not user devices. If several devices are behind a single IP address, and only some are controlled by a bot network, sign-ins from other devices may trigger this event unnecessarily, which is why this risk detection is classified as Low.","type":"unstyled","key":"fnuqh","entityRanges":[],"data":{},"depth":0,"inlineStyleRanges":[]},{"inlineStyleRanges":[{"length":9,"style":"BOLD","offset":0}],"type":"unstyled","key":"fc3ej","text":"Box 2: No","entityRanges":[],"depth":0,"data":{}},{"key":"3shng","depth":0,"type":"unstyled","entityRanges":[],"inlineStyleRanges":[],"data":{},"text":"User2 will receive the two alerts classified as medium or higher."},{"inlineStyleRanges":[],"data":{},"entityRanges":[],"text":"Email alerts are sent to all global admins, security admins, and security readers","type":"unstyled","key":"81rao","depth":0},{"entityRanges":[],"data":{},"text":"Sign-ins from the infected device are classified as low. This risk detection identifies IP addresses, not user devices. If several devices are behind a single IP address, and only some are controlled by a bot network, sign-ins from other devices may trigger this event unnecessarily, which is why this risk detection is classified as Low.","inlineStyleRanges":[],"depth":0,"key":"2hg9v","type":"unstyled"},{"entityRanges":[],"text":"Box 3: No","depth":0,"data":{},"type":"unstyled","inlineStyleRanges":[{"length":9,"offset":0,"style":"BOLD"}],"key":"shoc"},{"type":"unstyled","depth":0,"key":"9benb","data":{},"entityRanges":[],"text":"User3 will not receive alters.","inlineStyleRanges":[]},{"text":"Email alerts are sent to all global admins, security admins, and security readers.","depth":0,"data":{},"type":"unstyled","entityRanges":[],"inlineStyleRanges":[],"key":"f82l0"},{"key":"49c2a","inlineStyleRanges":[],"data":{},"type":"unstyled","text":"https://www.gitbit.org/course/ms-500/learn/Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","entityRanges":[{"key":0,"length":123,"offset":0}],"depth":0},{"key":"btri2","inlineStyleRanges":[],"entityRanges":[{"offset":0,"key":1,"length":104}],"data":{},"text":"https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/overview-identity-protection","type":"unstyled","depth":0},{"entityRanges":[{"offset":0,"key":2,"length":125}],"key":"6d4nq","depth":0,"type":"unstyled","text":"https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/howto-identity-protection-configure-risk-policies","data":{},"inlineStyleRanges":[]}],"entityMap":{"0":{"mutability":"MUTABLE","type":"LINK","data":{"targetOption":"_blank","url":"https://www.gitbit.org/course/ms-500/learn/Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ"}},"1":{"type":"LINK","data":{"url":"https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/overview-identity-protection","targetOption":"_blank"},"mutability":"MUTABLE"},"2":{"data":{"targetOption":"_blank","url":"https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/overview-identity-protection"},"type":"LINK","mutability":"MUTABLE"}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'vxLbzynWU',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft 365 E5 subscription that contains an Azure Active Directory (Azure AD) tenant named gitbit.org.</p>
<p>Azure AD Identity Protection alerts for gitbit.org are configured as shown in the following exhibit.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/RTNLdyM/Users-At-Risk.png" alt="Users at Risk screenshot" style="height: auto;width: auto"/></div>
<p>A user named John Gruber is configured to receive alerts from Azure AD Identity Protection.</p>
<p>You create users in gitbit.org as shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/wzLBtGJ/user-role-chart.png" alt="User role chart" style="height: auto;width: auto"/></div>
<p>The users perform the sign-ins shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/dDHb6VK/user-risk-chart.png" alt="User RIsk Chart" style="height: auto;width: auto"/></div>
<p>For each of the following statements, click the checkbox if the statement is true.</p>
`,
      questionText: `You have a Microsoft 365 E5 subscription that contains an Azure Active Directory (Azure AD) tenant named gitbit.org. Azure AD Identity Protection alerts for gitbit.org are configured as shown in the following exhibit. A user named John Gruber is configured to receive alerts from Azure AD Identity Protection. You create users in gitbit.org as shown in the following table. The users perform the sign-ins shown in the following table. For each of the following statements, click the checkbox if the statement is true.`,
      referencesHtml: `<p><strong>Box 1: No</strong></p>
<p>User1 will receive the two alerts classified as medium or higher.</p>
<p>Sign-ins from an infected device are classified as low. This risk detection identifies IP addresses, not user devices. If several devices are behind a single IP address, and only some are controlled by a bot network, sign-ins from other devices may trigger this event unnecessarily, which is why this risk detection is classified as Low.</p>
<p><strong>Box 2: No</strong></p>
<p>User2 will receive the two alerts classified as medium or higher.</p>
<p>Email alerts are sent to all global admins, security admins, and security readers</p>
<p>Sign-ins from the infected device are classified as low. This risk detection identifies IP addresses, not user devices. If several devices are behind a single IP address, and only some are controlled by a bot network, sign-ins from other devices may trigger this event unnecessarily, which is why this risk detection is classified as Low.</p>
<p><strong>Box 3: No</strong></p>
<p>User3 will not receive alters.</p>
<p>Email alerts are sent to all global admins, security admins, and security readers.</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ" target="_blank">https://www.gitbit.org/course/ms-500/learn/Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ</a></p>
<p><a href="https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/overview-identity-protection" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/overview-identity-protection</a></p>
<p><a href="https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/overview-identity-protection" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/howto-identity-protection-configure-risk-policies</a></p>
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
