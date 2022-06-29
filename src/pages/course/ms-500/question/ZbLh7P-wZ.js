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
      question: {"answers":[{"isCorrectAnswer":false,"value":"From Microsoft 365 Admin Center go to Users > Select the user > Devices > Device Settings"},{"isCorrectAnswer":false,"value":"From the Azure Active Directory Admin Center > Enterprise Admin > Devices > Device Settings"},{"isCorrectAnswer":true,"value":"From the Azure Active Directory Admin Center > Azure Active Directory > Devices > Device Settings"},{"isCorrectAnswer":false,"value":"From the Endpoint manager > Devices > Compliance Policies"}],"id":"ZbLh7P-wZ","question":{"blocks":[{"entityRanges":[],"key":"4uj8k","depth":0,"inlineStyleRanges":[{"style":"color-rgb(80,80,80)","offset":0,"length":99},{"offset":100,"style":"color-rgb(80,80,80)","length":72},{"length":99,"offset":0,"style":"bgcolor-rgb(255,255,255)"},{"style":"bgcolor-rgb(255,255,255)","length":72,"offset":100},{"style":"fontsize-16","length":99,"offset":0},{"length":72,"style":"fontsize-16","offset":100},{"length":99,"offset":0,"style":"fontfamily-Roboto Condensed\", sans-serif"},{"length":72,"offset":100,"style":"fontfamily-Roboto Condensed\", sans-serif"}],"text":"You need to ensure that each user can join up to five devices to Azure Active Directory (Azure AD).\nTo complete this task, sign in to the Microsoft Office 365 admin center.","data":{},"type":"unstyled"},{"depth":0,"key":"al4ck","data":{},"text":"What steps should you take to complete the task?","entityRanges":[],"inlineStyleRanges":[{"style":"color-rgb(33,37,41)","offset":0,"length":48},{"style":"bgcolor-rgb(255,255,255)","length":48,"offset":0},{"style":"fontsize-16","length":48,"offset":0},{"length":48,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","offset":0}],"type":"unstyled"}],"entityMap":{}},"references":{"blocks":[{"entityRanges":[{"offset":0,"length":69,"key":0}],"key":"2re38","type":"unstyled","data":{},"depth":0,"inlineStyleRanges":[],"text":"https://www.iorad.com/player/1795886/MS-500---Limit-user-devices-to-5 "},{"entityRanges":[],"type":"ordered-list-item","text":"After signing into the Microsoft 365 admin center, click Show All Admin centers > Azure Active Directory.","depth":0,"data":{},"key":"db95n","inlineStyleRanges":[{"offset":57,"style":"BOLD","length":8}]},{"entityRanges":[],"inlineStyleRanges":[],"data":{},"key":"21n2d","depth":0,"type":"ordered-list-item","text":"Click Azure Active Directory > Devices > Device Settings."},{"key":"9o5f3","text":"Set the Users may join devices to Azure AD setting to All.","inlineStyleRanges":[],"depth":0,"type":"ordered-list-item","entityRanges":[],"data":{}},{"inlineStyleRanges":[{"offset":66,"length":3,"style":"BOLD"}],"type":"ordered-list-item","entityRanges":[],"key":"dbo7n","depth":0,"text":"Set the Users may register their devices with Azure AD setting to All.","data":{}},{"inlineStyleRanges":[],"entityRanges":[],"depth":0,"data":{},"key":"2bh0b","text":"Set the Maximum number of devices setting to 5.","type":"ordered-list-item"},{"depth":0,"key":"eu8jf","inlineStyleRanges":[],"entityRanges":[],"type":"ordered-list-item","data":{},"text":"Click the Save button at the top left of the screen."},{"data":{},"key":"d6om3","inlineStyleRanges":[],"type":"unstyled","depth":0,"entityRanges":[],"text":"Reference:"},{"key":"44v53","entityRanges":[{"key":1,"offset":0,"length":75}],"text":"https://www.gitbit.org/course/ms-500/learn/Introduction-to-Intune-7gR3L122b","inlineStyleRanges":[],"type":"unstyled","depth":0,"data":{}},{"depth":0,"type":"unstyled","data":{},"inlineStyleRanges":[],"entityRanges":[{"offset":0,"key":2,"length":222}],"text":"https://docs.microsoft.com/en-us/azure/active-directory/devices/device-management-azure-portal https://docs.microsoft.com/en-us/microsoft-365/compliance/use-your-free-azure-ad-subscription-in-office-365?view=o365-worldwide","key":"fpptk"}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"targetOption":"_blank","url":"https://www.iorad.com/player/1795886/MS-500---Limit-user-devices-to-5"}},"1":{"data":{"url":"https://www.gitbit.org/course/ms-500/learn/Introduction-to-Intune-7gR3L122b","targetOption":"_blank"},"type":"LINK","mutability":"MUTABLE"},"2":{"mutability":"MUTABLE","type":"LINK","data":{"targetOption":"_blank","url":"https://docs.microsoft.com/en-us/azure/active-directory/devices/device-management-azure-portal"}}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'ZbLh7P-wZ',
      questionIdx: '',
      questionHtml: `<p><span style="color: rgb(80,80,80);background-color: rgb(255,255,255);font-size: 16px;font-family: Roboto Condensed", sans-serif;">You need to ensure that each user can join up to five devices to Azure Active Directory (Azure AD).</span><br><span style="color: rgb(80,80,80);background-color: rgb(255,255,255);font-size: 16px;font-family: Roboto Condensed", sans-serif;">To complete this task, sign in to the Microsoft Office 365 admin center.</span></p>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">What steps should you take to complete the task?</span></p>
`,
      questionText: `You need to ensure that each user can join up to five devices to Azure Active Directory (Azure AD). To complete this task, sign in to the Microsoft Office 365 admin center. What steps should you take to complete the task?`,
      referencesHtml: `<p><a href="https://www.iorad.com/player/1795886/MS-500---Limit-user-devices-to-5" target="_blank">https://www.iorad.com/player/1795886/MS-500---Limit-user-devices-to-5</a>&nbsp;</p>
<ol>
<li>After signing into the Microsoft 365 admin center, click <strong>Show All</strong> Admin centers &gt; Azure Active Directory.</li>
<li>Click Azure Active Directory &gt; Devices &gt; Device Settings.</li>
<li>Set the Users may join devices to Azure AD setting to All.</li>
<li>Set the Users may register their devices with Azure AD setting to <strong>All</strong>.</li>
<li>Set the Maximum number of devices setting to 5.</li>
<li>Click the Save button at the top left of the screen.</li>
</ol>
<p>Reference:</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Introduction-to-Intune-7gR3L122b" target="_blank">https://www.gitbit.org/course/ms-500/learn/Introduction-to-Intune-7gR3L122b</a></p>
<p><a href="https://docs.microsoft.com/en-us/azure/active-directory/devices/device-management-azure-portal" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/devices/device-management-azure-portal https://docs.microsoft.com/en-us/microsoft-365/compliance/use-your-free-azure-ad-subscription-in-office-365?view=o365-worldwide</a></p>
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
