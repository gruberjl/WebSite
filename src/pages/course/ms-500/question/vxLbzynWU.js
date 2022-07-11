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
      question: {"answers":[{"value":"John Gruber receives 3 email alerts from Azure AD Identity Protection","isCorrectAnswer":false},{"value":"User2 receives 3 email alerts from Azure AD Identity Protection","isCorrectAnswer":false},{"value":"User3 receives 2 email alerts from Azure AD Identity Protection","isCorrectAnswer":false}],"id":"vxLbzynWU","question":{"entityMap":{"0":{"data":{"alignment":"left","alt":"Users at Risk screenshot","src":"https://i.ibb.co/RTNLdyM/Users-At-Risk.png","height":"auto","width":"auto"},"mutability":"MUTABLE","type":"IMAGE"},"1":{"mutability":"MUTABLE","data":{"alt":"User role chart","alignment":"left","height":"auto","src":"https://i.ibb.co/wzLBtGJ/user-role-chart.png","width":"auto"},"type":"IMAGE"},"2":{"mutability":"MUTABLE","type":"IMAGE","data":{"width":"auto","alt":"User RIsk Chart","src":"https://i.ibb.co/dDHb6VK/user-risk-chart.png","alignment":"left","height":"auto"}}},"blocks":[{"entityRanges":[],"data":{},"depth":0,"key":"957rl","inlineStyleRanges":[],"type":"unstyled","text":"You have a Microsoft 365 E5 subscription that contains an Azure Active Directory (Azure AD) tenant named gitbit.org."},{"inlineStyleRanges":[],"data":{},"key":"8uunj","depth":0,"type":"unstyled","entityRanges":[],"text":"Azure AD Identity Protection alerts for gitbit.org are configured as shown in the following exhibit."},{"inlineStyleRanges":[],"depth":0,"text":" ","data":{},"type":"atomic","entityRanges":[{"length":1,"key":0,"offset":0}],"key":"d1p7o"},{"entityRanges":[],"inlineStyleRanges":[],"depth":0,"type":"unstyled","text":"A user named John Gruber is configured to receive alerts from Azure AD Identity Protection.","key":"deom4","data":{}},{"inlineStyleRanges":[],"type":"unstyled","key":"c9k4u","depth":0,"entityRanges":[],"data":{},"text":"You create users in gitbit.org as shown in the following table."},{"data":{},"key":"bd174","inlineStyleRanges":[],"entityRanges":[{"key":1,"length":1,"offset":0}],"text":" ","type":"atomic","depth":0},{"type":"unstyled","inlineStyleRanges":[],"entityRanges":[],"depth":0,"data":{},"key":"10fuk","text":"The users perform the sign-ins shown in the following table."},{"key":"1pjgg","inlineStyleRanges":[],"entityRanges":[{"key":2,"length":1,"offset":0}],"text":" ","depth":0,"type":"atomic","data":{}},{"text":"For each of the following statements, click the checkbox if the statement is true.","entityRanges":[],"data":{},"key":"6nlr4","type":"unstyled","inlineStyleRanges":[],"depth":0}]},"references":{"entityMap":{"0":{"data":{"targetOption":"_blank","url":"https://www.gitbit.org/course/ms-500/learn/Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ"},"mutability":"MUTABLE","type":"LINK"},"1":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/overview-identity-protection","targetOption":"_blank"}},"2":{"type":"LINK","data":{"targetOption":"_blank","url":"https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/overview-identity-protection"},"mutability":"MUTABLE"}},"blocks":[{"depth":0,"key":"b4n82","inlineStyleRanges":[{"style":"BOLD","length":9,"offset":0}],"type":"unstyled","entityRanges":[],"text":"Box 1: No","data":{}},{"entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"key":"a4q6n","depth":0,"data":{},"text":"User1 will receive the two alerts classified as medium or higher."},{"entityRanges":[],"depth":0,"type":"unstyled","text":"Sign-ins from an infected device are classified as low. This risk detection identifies IP addresses, not user devices. If several devices are behind a single IP address, and only some are controlled by a bot network, sign-ins from other devices may trigger this event unnecessarily, which is why this risk detection is classified as Low.","data":{},"inlineStyleRanges":[],"key":"fnuqh"},{"depth":0,"type":"unstyled","data":{},"inlineStyleRanges":[{"length":9,"offset":0,"style":"BOLD"}],"entityRanges":[],"key":"fc3ej","text":"Box 2: No"},{"key":"3shng","depth":0,"entityRanges":[],"text":"User2 will receive the two alerts classified as medium or higher.","type":"unstyled","data":{},"inlineStyleRanges":[]},{"text":"Email alerts are sent to all global admins, security admins, and security readers","key":"81rao","type":"unstyled","data":{},"depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"text":"Sign-ins from the infected device are classified as low. This risk detection identifies IP addresses, not user devices. If several devices are behind a single IP address, and only some are controlled by a bot network, sign-ins from other devices may trigger this event unnecessarily, which is why this risk detection is classified as Low.","key":"2hg9v","entityRanges":[],"data":{},"depth":0,"inlineStyleRanges":[],"type":"unstyled"},{"depth":0,"type":"unstyled","inlineStyleRanges":[{"offset":0,"length":9,"style":"BOLD"}],"entityRanges":[],"key":"shoc","data":{},"text":"Box 3: No"},{"key":"9benb","inlineStyleRanges":[],"entityRanges":[],"data":{},"type":"unstyled","depth":0,"text":"User3 will not receive alters."},{"inlineStyleRanges":[],"key":"f82l0","type":"unstyled","entityRanges":[],"depth":0,"text":"Email alerts are sent to all global admins, security admins, and security readers.","data":{}},{"text":"https://www.gitbit.org/course/ms-500/learn/Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","type":"unstyled","data":{},"entityRanges":[{"offset":0,"key":0,"length":123}],"key":"49c2a","inlineStyleRanges":[],"depth":0},{"inlineStyleRanges":[],"entityRanges":[{"key":1,"length":104,"offset":0}],"depth":0,"key":"btri2","type":"unstyled","data":{},"text":"https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/overview-identity-protection"},{"inlineStyleRanges":[],"entityRanges":[{"key":2,"offset":0,"length":125}],"depth":0,"data":{},"text":"https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/howto-identity-protection-configure-risk-policies","key":"6d4nq","type":"unstyled"}]}},
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
