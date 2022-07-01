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
      question: {"answers":[{"value":"Device1","isCorrectAnswer":false},{"value":"Device2","isCorrectAnswer":true},{"value":"Device6","isCorrectAnswer":true}],"id":"Vw6DPEjhS","question":{"entityMap":{"0":{"mutability":"MUTABLE","type":"IMAGE","data":{"src":"https://i.ibb.co/rt25GT1/Devices.png","alignment":"left","height":"auto","alt":"Devices Chart","width":"auto"}},"1":{"mutability":"MUTABLE","type":"IMAGE","data":{"alt":"Device policies chart","src":"https://i.ibb.co/YZzVcsL/Device-policies.png","height":"auto","alignment":"left","width":"auto"}},"2":{"mutability":"MUTABLE","type":"IMAGE","data":{"alt":"Device policy group chart","src":"https://i.ibb.co/hXnkN3N/Device-policy-goups.png","height":"auto","width":"auto","alignment":"left"}}},"blocks":[{"key":"6t3pm","data":{},"entityRanges":[],"type":"unstyled","depth":0,"inlineStyleRanges":[],"text":"The devices enrolled in Intune are configured as shown in the following table:"},{"data":{},"depth":0,"entityRanges":[{"offset":0,"key":0,"length":1}],"text":" ","inlineStyleRanges":[],"key":"9tjo3","type":"atomic"},{"inlineStyleRanges":[],"depth":0,"data":{},"key":"c0grv","type":"unstyled","text":"The device compliance policies in Intune are configured as shown in the following table:","entityRanges":[]},{"type":"atomic","entityRanges":[{"key":1,"length":1,"offset":0}],"text":" ","inlineStyleRanges":[],"depth":0,"data":{},"key":"99it7"},{"entityRanges":[],"data":{},"type":"unstyled","key":"56p0h","text":"The device compliance policies have the assignments shown in the following table:","depth":0,"inlineStyleRanges":[]},{"data":{},"depth":0,"type":"atomic","entityRanges":[{"key":2,"length":1,"offset":0}],"inlineStyleRanges":[],"key":"62f10","text":" "},{"inlineStyleRanges":[],"text":"The Mark devices with no compliance policy are assigned as Compliant.","type":"unstyled","depth":0,"entityRanges":[],"data":{},"key":"a7l90"},{"entityRanges":[],"data":{},"inlineStyleRanges":[],"type":"unstyled","depth":0,"key":"16cgt","text":"You are evaluating which devices are compliant with Intune."},{"type":"unstyled","key":"evag6","entityRanges":[],"depth":0,"data":{},"text":"Check the box if the device is compliant","inlineStyleRanges":[]}]},"references":{"blocks":[{"depth":0,"inlineStyleRanges":[{"offset":0,"length":89,"style":"color-rgb(33,37,41)"},{"length":89,"offset":0,"style":"bgcolor-rgb(255,255,255)"},{"length":89,"offset":0,"style":"fontsize-16"},{"length":89,"offset":0,"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji"}],"text":"Device1 is an Android device that is not encrypted that's a member of GroupA and GroupC. DevicePolicy3 applies to Android devices that are members of GroupA so DevicePolicy3 is applied and requires the device to be encrypted. Since Device1 is not encrypted the device is not compliant.","key":"77i1q","entityRanges":[],"type":"unstyled","data":{}},{"text":"Device2 is a Windows 10 computer that's encrypted and a member of GroupB and GroupC. DevicePolicy2 has an exclusion of GroupC so Device2 doesn't have a compliance policy. As stated all devices that don't have a compliance policy are marked compliant so Device2 is marked compliant.","depth":0,"data":{},"type":"unstyled","inlineStyleRanges":[],"key":"bi4mp","entityRanges":[]},{"entityRanges":[],"text":"Device6 is a Windows 10 computer that is not a member of any group therefore it has no compliance policy applied and is therefore marked as compliant.","type":"unstyled","data":{},"inlineStyleRanges":[],"depth":0,"key":"aisi1"},{"entityRanges":[{"length":86,"offset":0,"key":0}],"key":"4tanb","type":"unstyled","data":{},"depth":0,"text":"https://www.gitbit.org/course/ms-500/learn/Understanding-compliance-policies-qDRA4jjoN ","inlineStyleRanges":[]}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"targetOption":"_blank","url":"https://www.gitbit.org/course/ms-500/learn/Understanding-compliance-policies-qDRA4jjoN"}}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'Vw6DPEjhS',
      questionIdx: '',
      questionHtml: `<p>The devices enrolled in Intune are configured as shown in the following table:</p>
<div style="text-align:left;"><img src="https://i.ibb.co/rt25GT1/Devices.png" alt="Devices Chart" style="height: auto;width: auto"/></div>
<p>The device compliance policies in Intune are configured as shown in the following table:</p>
<div style="text-align:left;"><img src="https://i.ibb.co/YZzVcsL/Device-policies.png" alt="Device policies chart" style="height: auto;width: auto"/></div>
<p>The device compliance policies have the assignments shown in the following table:</p>
<div style="text-align:left;"><img src="https://i.ibb.co/hXnkN3N/Device-policy-goups.png" alt="Device policy group chart" style="height: auto;width: auto"/></div>
<p>The Mark devices with no compliance policy are assigned as Compliant.</p>
<p>You are evaluating which devices are compliant with Intune.</p>
<p>Check the box if the device is compliant</p>
`,
      questionText: `The devices enrolled in Intune are configured as shown in the following table: The device compliance policies in Intune are configured as shown in the following table: The device compliance policies have the assignments shown in the following table: The Mark devices with no compliance policy are assigned as Compliant. You are evaluating which devices are compliant with Intune. Check the box if the device is compliant`,
      referencesHtml: `<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Device1 is an Android device that is not encrypted that's a member of GroupA and GroupC. </span>DevicePolicy3 applies to Android devices that are members of GroupA so DevicePolicy3 is applied and requires the device to be encrypted. Since Device1 is not encrypted the device is not compliant.</p>
<p>Device2 is a Windows 10 computer that's encrypted and a member of GroupB and GroupC. DevicePolicy2 has an exclusion of GroupC so Device2 doesn't have a compliance policy. As stated all devices that don't have a compliance policy are marked compliant so Device2 is marked compliant.</p>
<p>Device6 is a Windows 10 computer that is not a member of any group therefore it has no compliance policy applied and is therefore marked as compliant.</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Understanding-compliance-policies-qDRA4jjoN" target="_blank">https://www.gitbit.org/course/ms-500/learn/Understanding-compliance-policies-qDRA4jjoN</a>&nbsp;</p>
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
