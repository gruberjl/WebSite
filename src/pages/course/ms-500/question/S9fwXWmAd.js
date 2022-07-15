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
      question: {"answers":[{"isCorrectAnswer":true,"value":"If a user creates a file in Microsoft OneDrive on January 1, 2018, users can access the file on January 15, 2019"},{"isCorrectAnswer":true,"value":"If a user deletes a file in Microsoft OneDrive on January 1, 2018, an administrator can recover the file on April 15, 2019"},{"value":"If a user creates a file in Microsoft OneDrive on January 1, 2018, an administrator can recover the file on April 15, 2022","isCorrectAnswer":false}],"id":"S9fwXWmAd","question":{"blocks":[{"key":"4nfs6","depth":0,"entityRanges":[],"data":{},"type":"unstyled","inlineStyleRanges":[],"text":"You have a Microsoft 365 subscription. From the Security & Compliance admin center, you create the retention policies shown in the following table."},{"entityRanges":[{"length":1,"offset":0,"key":0}],"inlineStyleRanges":[],"data":{},"key":"3upt2","depth":0,"type":"atomic","text":" "},{"entityRanges":[],"depth":0,"inlineStyleRanges":[],"key":"ds2hq","text":"Policy1 is configured as showing in the following exhibit.","data":{},"type":"unstyled"},{"data":{},"key":"1n74n","depth":0,"entityRanges":[{"key":1,"offset":0,"length":1}],"text":" ","type":"atomic","inlineStyleRanges":[]},{"data":{},"inlineStyleRanges":[],"type":"unstyled","text":"Policy2 is configured as shown in the following exhibit.","entityRanges":[],"key":"1bram","depth":0},{"key":"fi15k","text":" ","data":{},"type":"atomic","inlineStyleRanges":[],"entityRanges":[{"offset":0,"key":2,"length":1}],"depth":0},{"depth":0,"data":{},"type":"unstyled","entityRanges":[],"inlineStyleRanges":[],"key":"2chn0","text":"For each of the following statements, check the box if the statement is true."}],"entityMap":{"0":{"mutability":"MUTABLE","type":"IMAGE","data":{"alignment":"left","height":"auto","width":"auto","alt":"Policy locations chart","src":"https://i.ibb.co/VTTN5M2/policy-locations.png"}},"1":{"mutability":"MUTABLE","type":"IMAGE","data":{"src":"https://i.ibb.co/Z825ptq/Policy1-Retention-Policy.png","alignment":"left","alt":"Policy1 Retention Policy","height":"auto","width":"auto"}},"2":{"mutability":"MUTABLE","type":"IMAGE","data":{"alt":"Policy2 Retention Policy","height":"auto","alignment":"left","width":"auto","src":"https://i.ibb.co/dKBJVmq/Policy2-Retention-Policy.png"}}}},"references":{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","targetOption":"_blank"}},"1":{"mutability":"MUTABLE","data":{"targetOption":"_blank","url":"https://docs.microsoft.com/en-us/office365/securitycompliance/retention-policies?redirectSourcePath=%252fen-us%252farticle%252fOverview-of-retention-"},"type":"LINK"}},"blocks":[{"entityRanges":[],"data":{},"key":"dspqb","inlineStyleRanges":[],"depth":0,"text":"Policy2 is in effect because retention wins over deletion. Content won't be permanently deleted when it also has retention settings to retain it.","type":"unstyled"},{"entityRanges":[{"length":114,"offset":0,"key":0}],"key":"4emjm","data":{},"text":"https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f","inlineStyleRanges":[],"type":"unstyled","depth":0},{"depth":0,"text":"https://docs.microsoft.com/en-us/office365/securitycompliance/retention-policies?redirectSourcePath=%252fen-us%252farticle%252fOverview-of-retention- policies-5e377752-700d-4870-9b6d-12bfc12d2423#the-principles-of-retention-or-what-takes-precedence ","entityRanges":[{"length":248,"offset":0,"key":1}],"type":"unstyled","inlineStyleRanges":[],"data":{},"key":"326tf"}]}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'S9fwXWmAd',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft 365 subscription. From the Security &amp; Compliance admin center, you create the retention policies shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/VTTN5M2/policy-locations.png" alt="Policy locations chart" style="height: auto;width: auto"/></div>
<p>Policy1 is configured as showing in the following exhibit.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/Z825ptq/Policy1-Retention-Policy.png" alt="Policy1 Retention Policy" style="height: auto;width: auto"/></div>
<p>Policy2 is configured as shown in the following exhibit.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/dKBJVmq/Policy2-Retention-Policy.png" alt="Policy2 Retention Policy" style="height: auto;width: auto"/></div>
<p>For each of the following statements, check the box if the statement is true.</p>
`,
      questionText: `You have a Microsoft 365 subscription. From the Security & Compliance admin center, you create the retention policies shown in the following table. Policy1 is configured as showing in the following exhibit. Policy2 is configured as shown in the following exhibit. For each of the following statements, check the box if the statement is true.`,
      referencesHtml: `<p>Policy2 is in effect because retention wins over deletion. Content won't be permanently deleted when it also has retention settings to retain it.</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f" target="_blank">https://www.gitbit.org/course/ms-500/learn/Creating-and-managing-data-retention-to-conform-to-compliance-NsF7No40f</a></p>
<p><a href="https://docs.microsoft.com/en-us/office365/securitycompliance/retention-policies?redirectSourcePath=%252fen-us%252farticle%252fOverview-of-retention-" target="_blank">https://docs.microsoft.com/en-us/office365/securitycompliance/retention-policies?redirectSourcePath=%252fen-us%252farticle%252fOverview-of-retention- policies-5e377752-700d-4870-9b6d-12bfc12d2423#the-principles-of-retention-or-what-takes-precedence</a>&nbsp;</p>
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
        url: 'https://www.gitbit.org/course/ms-500/question/S9fwXWmAd',
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
