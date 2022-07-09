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
      question: {"answers":[{"isCorrectAnswer":true,"value":"Must change their password: User1 only"},{"isCorrectAnswer":false,"value":"Must change their password: User2 only"},{"isCorrectAnswer":false,"value":"Must change their password: Both User1 and User2"},{"value":"Must change their password: Neither User1 nor User2","isCorrectAnswer":false},{"isCorrectAnswer":false,"value":"Prompted for MFA: User1 only"},{"isCorrectAnswer":true,"value":"Prompted for MFA: User2 only"},{"value":"Prompted for MFA: Both User1 and User2","isCorrectAnswer":false},{"value":"Prompted for MFA: Neither User1 nor User2","isCorrectAnswer":false}],"id":"EPxtY1Mal","question":{"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"width":"auto","alignment":"left","src":"https://i.ibb.co/ctNx9tq/Chart3.png","height":"auto","alt":"User, group, MFA status chart"}}},"blocks":[{"inlineStyleRanges":[],"key":"c9a3h","text":"You have a Microsoft Azure Active Directory (Azure AD) tenant named contoso.com that contains the users shown in the following table.","data":{},"type":"unstyled","depth":0,"entityRanges":[]},{"depth":0,"data":{},"key":"83o7o","entityRanges":[{"key":0,"offset":0,"length":1}],"inlineStyleRanges":[],"type":"atomic","text":" "},{"type":"unstyled","depth":0,"inlineStyleRanges":[],"text":"You create and enforce an Azure AD Identity Protection user risk policy that has the following settings:","entityRanges":[],"key":"biqrr","data":{}},{"key":"350er","inlineStyleRanges":[],"text":"Assignments: Include Group1, Exclude Group2","entityRanges":[],"data":{},"type":"unordered-list-item","depth":0},{"entityRanges":[],"depth":0,"type":"unordered-list-item","text":"Conditions: Sign-in risk of Low and above","key":"9unnq","data":{},"inlineStyleRanges":[]},{"data":{},"type":"unordered-list-item","inlineStyleRanges":[],"entityRanges":[],"key":"g8gt","depth":0,"text":"Access: Allow access, Require password change"},{"inlineStyleRanges":[],"depth":0,"data":{},"entityRanges":[],"type":"unstyled","key":"90j","text":"You need to identify how the policy affects User1 and User2."},{"entityRanges":[],"text":"What occurs when User1 and User2 sign in from an unfamiliar location?","inlineStyleRanges":[],"type":"unstyled","depth":0,"data":{},"key":"950ob"}]},"references":{"blocks":[{"inlineStyleRanges":[],"data":{},"text":"Unfamiliar location sign-in is considered a low risk so the user risk policy would initiate. Group1 is assigned in the user risk policy and Group2 is excluded so only User1 is affected by the policy so only User1 will be required to change their password.","key":"chcdi","type":"unstyled","depth":0,"entityRanges":[]},{"data":{},"key":"da7a5","entityRanges":[],"depth":0,"text":"User1 isn't configured for MFA but User2 is so only User2 will be prompted for MFA.","inlineStyleRanges":[],"type":"unstyled"},{"data":{},"text":"https://www.gitbit.org/course/ms-500/learn/Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ","key":"b542b","type":"unstyled","entityRanges":[{"offset":0,"key":0,"length":123}],"depth":0,"inlineStyleRanges":[]},{"text":"https://www.gitbit.org/course/ms-500/learn/The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk ","inlineStyleRanges":[],"entityRanges":[{"length":128,"key":1,"offset":0}],"data":{},"depth":0,"type":"unstyled","key":"ag5bh"},{"inlineStyleRanges":[],"text":"https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/concept-conditional-access-users-groups","data":{},"depth":0,"type":"unstyled","entityRanges":[{"offset":0,"length":114,"key":2}],"key":"f3bq1"}],"entityMap":{"0":{"data":{"targetOption":"_blank","url":"https://www.gitbit.org/course/ms-500/learn/Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ"},"type":"LINK","mutability":"MUTABLE"},"1":{"data":{"targetOption":"_blank","url":"https://www.gitbit.org/course/ms-500/learn/The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk"},"mutability":"MUTABLE","type":"LINK"},"2":{"type":"LINK","mutability":"MUTABLE","data":{"targetOption":"_blank","url":"https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/concept-conditional-access-users-groups"}}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'EPxtY1Mal',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft Azure Active Directory (Azure AD) tenant named contoso.com that contains the users shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/ctNx9tq/Chart3.png" alt="User, group, MFA status chart" style="height: auto;width: auto"/></div>
<p>You create and enforce an Azure AD Identity Protection user risk policy that has the following settings:</p>
<ul>
<li>Assignments: Include Group1, Exclude Group2</li>
<li>Conditions: Sign-in risk of Low and above</li>
<li>Access: Allow access, Require password change</li>
</ul>
<p>You need to identify how the policy affects User1 and User2.</p>
<p>What occurs when User1 and User2 sign in from an unfamiliar location?</p>
`,
      questionText: `You have a Microsoft Azure Active Directory (Azure AD) tenant named contoso.com that contains the users shown in the following table. You create and enforce an Azure AD Identity Protection user risk policy that has the following settings: Assignments: Include Group1, Exclude Group2 Conditions: Sign-in risk of Low and above Access: Allow access, Require password change You need to identify how the policy affects User1 and User2. What occurs when User1 and User2 sign in from an unfamiliar location?`,
      referencesHtml: `<p>Unfamiliar location sign-in is considered a low risk so the user risk policy would initiate. Group1 is assigned in the user risk policy and Group2 is excluded so only User1 is affected by the policy so only User1 will be required to change their password.</p>
<p>User1 isn't configured for MFA but User2 is so only User2 will be prompted for MFA.</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ" target="_blank">https://www.gitbit.org/course/ms-500/learn/Implementing-intelligent-security-using-risk-policies-in-Microsoft-365-NFQ6rYFeQ</a></p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk" target="_blank">https://www.gitbit.org/course/ms-500/learn/The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk</a>&nbsp;</p>
<p><a href="https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/concept-conditional-access-users-groups" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/concept-conditional-access-users-groups</a></p>
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
