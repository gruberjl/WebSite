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
      question: {"answers":[{"isCorrectAnswer":false,"value":"User1: Can sign in to the My Apps portal without using MFA"},{"value":"User1: Completed the MFA registration","isCorrectAnswer":false},{"value":"User1: Must complete the MFA registration at the next sign-in","isCorrectAnswer":true},{"isCorrectAnswer":false,"value":"User2: Can sign in to the My Apps portal without using MFA"},{"isCorrectAnswer":true,"value":"User2: Must use app passwords for legacy apps"},{"isCorrectAnswer":false,"value":"User2: Must use an app password to sign in to the My Apps portal"}],"id":"-T7jiUFfR","question":{"entityMap":{"0":{"data":{"height":"auto","alt":"Multi-Factor Authentication","src":"https://i.ibb.co/pQps3R2/MFA.png","alignment":"left","width":"auto"},"type":"IMAGE","mutability":"MUTABLE"},"1":{"mutability":"MUTABLE","type":"IMAGE","data":{"alignment":"left","src":"https://i.ibb.co/bmTyW56/user-chart.png","height":"auto","alt":"User chart showing 3 users","width":"auto"}}},"blocks":[{"text":"You have a Microsoft 365 subscription that uses the default domain name of gitbit.org.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{},"key":"2h8s2"},{"key":"2t9f1","depth":0,"entityRanges":[],"text":"The multi-factor authentication (MFA) service settings are configured as shown in the exhibit.","data":{},"inlineStyleRanges":[],"type":"unstyled"},{"text":" ","key":"2317e","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{},"type":"atomic"},{"entityRanges":[],"data":{},"inlineStyleRanges":[],"type":"unstyled","key":"ccd7r","text":"In gitbit.org, you create the users shown in the following table.","depth":0},{"depth":0,"data":{},"inlineStyleRanges":[],"key":"lvbg","type":"atomic","text":" ","entityRanges":[{"length":1,"offset":0,"key":1}]},{"key":"4b9b1","data":{},"entityRanges":[],"inlineStyleRanges":[],"text":"What is the effect of the configuration? To answer, select the appropriate options in the answer area.","depth":0,"type":"unstyled"}]},"references":{"blocks":[{"entityRanges":[],"key":"5mu1d","type":"unstyled","inlineStyleRanges":[],"depth":0,"data":{},"text":"The MFA Status Enabled means the user must set up MFA during the next login."},{"text":"Since \"Allow users to create app passwords to sign in to non-browser apps\" is checked that means a user can use the app password to login when MFA is not an available option.","type":"unstyled","entityRanges":[],"data":{},"inlineStyleRanges":[],"key":"d3ojg","depth":0},{"key":"9clot","data":{},"entityRanges":[{"offset":0,"length":128,"key":0}],"type":"unstyled","inlineStyleRanges":[],"depth":0,"text":"https://www.gitbit.org/course/ms-500/learn/The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk "},{"depth":0,"inlineStyleRanges":[],"entityRanges":[{"length":91,"key":1,"offset":0}],"data":{},"type":"unstyled","text":"https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-userstates","key":"dnvn8"}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://www.gitbit.org/course/ms-500/learn/The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk","targetOption":"_blank"}},"1":{"type":"LINK","data":{"url":"https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-userstates","targetOption":"_blank"},"mutability":"MUTABLE"}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: '-T7jiUFfR',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft 365 subscription that uses the default domain name of gitbit.org.</p>
<p>The multi-factor authentication (MFA) service settings are configured as shown in the exhibit.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/pQps3R2/MFA.png" alt="Multi-Factor Authentication" style="height: auto;width: auto"/></div>
<p>In gitbit.org, you create the users shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/bmTyW56/user-chart.png" alt="User chart showing 3 users" style="height: auto;width: auto"/></div>
<p>What is the effect of the configuration? To answer, select the appropriate options in the answer area.</p>
`,
      questionText: `You have a Microsoft 365 subscription that uses the default domain name of gitbit.org. The multi-factor authentication (MFA) service settings are configured as shown in the exhibit. In gitbit.org, you create the users shown in the following table. What is the effect of the configuration? To answer, select the appropriate options in the answer area.`,
      referencesHtml: `<p>The MFA Status Enabled means the user must set up MFA during the next login.</p>
<p>Since "Allow users to create app passwords to sign in to non-browser apps" is checked that means a user can use the app password to login when MFA is not an available option.</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk" target="_blank">https://www.gitbit.org/course/ms-500/learn/The-many-ways-to-implement-multi-factor-authentication-MFA-in-Microsoft-365-nAAIvNbtk</a>&nbsp;</p>
<p><a href="https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-userstates" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/authentication/howto-mfa-userstates</a></p>
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
