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
      question: {"answers":[{"isCorrectAnswer":true,"value":"On April 6, 2022, Device2 is flagged as compliant"},{"isCorrectAnswer":true,"value":"On April 10, 2022, Device1 is flagged as compliant"},{"value":"On April 16, 2020, Device1 is flagged as compliant","isCorrectAnswer":false}],"id":"6ch3t7KY1","question":{"blocks":[{"inlineStyleRanges":[],"depth":0,"data":{},"key":"8ag66","entityRanges":[],"text":"You have a Microsoft 365 tenant with Microsoft 365 E5 licenses. Your organization uses Intune and it's managed through the Microsoft Endpoint Manager admin center.","type":"unstyled"},{"inlineStyleRanges":[],"type":"unstyled","data":{},"text":"You've already configured the compliance policy settings as below.","entityRanges":[],"depth":0,"key":"3cv0k"},{"data":{},"inlineStyleRanges":[],"type":"atomic","text":" ","key":"fdqe7","entityRanges":[{"length":1,"offset":0,"key":0}],"depth":0},{"text":"On April 1, 2022, you create the device compliance policies shown below","inlineStyleRanges":[],"type":"unstyled","depth":0,"key":"2spop","data":{},"entityRanges":[]},{"inlineStyleRanges":[],"entityRanges":[{"key":1,"length":1,"offset":0}],"text":" ","type":"atomic","data":{},"depth":0,"key":"65slj"},{"text":"On April 5, 2022, users enroll the following Windows 10 devices in Intune.","depth":0,"type":"unstyled","inlineStyleRanges":[],"key":"b31el","data":{},"entityRanges":[]},{"entityRanges":[{"key":2,"offset":0,"length":1}],"key":"2annk","data":{},"inlineStyleRanges":[],"text":" ","type":"atomic","depth":0},{"depth":0,"key":"7isct","data":{},"type":"unstyled","text":"Check the boxes below if the statements are true.","inlineStyleRanges":[],"entityRanges":[]}],"entityMap":{"0":{"mutability":"MUTABLE","data":{"height":"auto","alignment":"left","src":"https://i.ibb.co/7QprCW9/Compliance-policy-default-settings.png","alt":"Compliance policy default settings","width":"auto"},"type":"IMAGE"},"1":{"type":"IMAGE","data":{"src":"https://i.ibb.co/Y7cX97M/compliance-policy-requirements.png","alignment":"left","alt":"Compliance policy requirement","height":"auto","width":"auto"},"mutability":"MUTABLE"},"2":{"mutability":"MUTABLE","type":"IMAGE","data":{"alt":"Compliance policy devices","height":"auto","alignment":"left","src":"https://i.ibb.co/X5ck0VC/compliance-policy-devices.png","width":"auto"}}}},"references":{"entityMap":{"0":{"mutability":"MUTABLE","data":{"url":"https://www.gitbit.org/course/ms-500/learn/Understanding-compliance-policies-qDRA4jjoN","targetOption":"_blank"},"type":"LINK"}},"blocks":[{"type":"unstyled","text":"On April 6, 2022, Device2 is flagged as compliant is true","depth":0,"key":"atuk","inlineStyleRanges":[{"style":"BOLD","offset":0,"length":57}],"entityRanges":[],"data":{}},{"inlineStyleRanges":[],"entityRanges":[],"data":{},"key":"5utm","type":"unstyled","text":"Device2 is in Group2 so Policy2 applies.","depth":0},{"type":"unstyled","inlineStyleRanges":[],"depth":0,"key":"fng6i","text":"Device2 is not compliant with Policy2, however, the device won't be marked as non-compliant until 10 days after the device was enrolled.","entityRanges":[],"data":{}},{"entityRanges":[],"data":{},"inlineStyleRanges":[{"style":"BOLD","length":58,"offset":0}],"text":"On April 10, 2022, Device1 is flagged as compliant is true","type":"unstyled","key":"gcor","depth":0},{"inlineStyleRanges":[],"key":"eku7n","entityRanges":[],"text":"Device1 is in Group1 and Group2 so both Policy1 and Policy2 apply.","type":"unstyled","depth":0,"data":{}},{"key":"ik9r","data":{},"depth":0,"text":"Device1 is compliant with Policy1 but non-compliant with Policy2. However, the device won't be marked as non-compliant until 10 days after the device was enrolled.","type":"unstyled","entityRanges":[],"inlineStyleRanges":[]},{"depth":0,"inlineStyleRanges":[{"length":62,"offset":0,"style":"BOLD"}],"text":"On April 16, 2020, Device1 is flagged as compliant is not true","entityRanges":[],"key":"8ujou","data":{},"type":"unstyled"},{"data":{},"text":"Device1 is in Group1 and Group2 so both Policy1 and Policy2 apply.","entityRanges":[],"inlineStyleRanges":[],"key":"cs208","type":"unstyled","depth":0},{"inlineStyleRanges":[],"key":"1d05a","text":"Device1 is compliant with Policy1 but non-compliant with Policy2.","entityRanges":[],"depth":0,"data":{},"type":"unstyled"},{"type":"unstyled","inlineStyleRanges":[],"entityRanges":[],"depth":0,"key":"ftmse","text":"March 16 is more than 10 days after the device was enrolled so it will now be marked as non-compliant by Policy2.","data":{}},{"data":{},"text":"https://www.gitbit.org/course/ms-500/learn/Understanding-compliance-policies-qDRA4jjoN","inlineStyleRanges":[],"key":"acqoh","type":"unstyled","depth":0,"entityRanges":[{"key":0,"offset":0,"length":86}]}]}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: '6ch3t7KY1',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft 365 tenant with Microsoft 365 E5 licenses. Your organization uses Intune and it's managed through the Microsoft Endpoint Manager admin center.</p>
<p>You've already configured the compliance policy settings as below.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/7QprCW9/Compliance-policy-default-settings.png" alt="Compliance policy default settings" style="height: auto;width: auto"/></div>
<p>On April 1, 2022, you create the device compliance policies shown below</p>
<div style="text-align:left;"><img src="https://i.ibb.co/Y7cX97M/compliance-policy-requirements.png" alt="Compliance policy requirement" style="height: auto;width: auto"/></div>
<p>On April 5, 2022, users enroll the following Windows 10 devices in Intune.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/X5ck0VC/compliance-policy-devices.png" alt="Compliance policy devices" style="height: auto;width: auto"/></div>
<p>Check the boxes below if the statements are true.</p>
`,
      questionText: `You have a Microsoft 365 tenant with Microsoft 365 E5 licenses. Your organization uses Intune and it's managed through the Microsoft Endpoint Manager admin center. You've already configured the compliance policy settings as below. On April 1, 2022, you create the device compliance policies shown below On April 5, 2022, users enroll the following Windows 10 devices in Intune. Check the boxes below if the statements are true.`,
      referencesHtml: `<p><strong>On April 6, 2022, Device2 is flagged as compliant is true</strong></p>
<p>Device2 is in Group2 so Policy2 applies.</p>
<p>Device2 is not compliant with Policy2, however, the device won't be marked as non-compliant until 10 days after the device was enrolled.</p>
<p><strong>On April 10, 2022, Device1 is flagged as compliant is true</strong></p>
<p>Device1 is in Group1 and Group2 so both Policy1 and Policy2 apply.</p>
<p>Device1 is compliant with Policy1 but non-compliant with Policy2. However, the device won't be marked as non-compliant until 10 days after the device was enrolled.</p>
<p><strong>On April 16, 2020, Device1 is flagged as compliant is not true</strong></p>
<p>Device1 is in Group1 and Group2 so both Policy1 and Policy2 apply.</p>
<p>Device1 is compliant with Policy1 but non-compliant with Policy2.</p>
<p>March 16 is more than 10 days after the device was enrolled so it will now be marked as non-compliant by Policy2.</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Understanding-compliance-policies-qDRA4jjoN" target="_blank">https://www.gitbit.org/course/ms-500/learn/Understanding-compliance-policies-qDRA4jjoN</a></p>
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
        url: 'https://www.gitbit.org/course/ms-500/question/6ch3t7KY1',
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
