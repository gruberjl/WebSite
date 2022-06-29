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
      question: {"answers":[{"value":"File1 triggers an alert from Policy1","isCorrectAnswer":true},{"isCorrectAnswer":false,"value":"File3 triggers an alert from Policy1"},{"isCorrectAnswer":false,"value":"File9 triggers an alert from Policy1"}],"id":"dvaW43tNR","question":{"blocks":[{"data":{},"type":"unstyled","inlineStyleRanges":[],"entityRanges":[],"depth":0,"key":"7riqo","text":"You have a Microsoft 365 subscription that contains a Microsoft SharePoint Online site named Site1. Site1 contains the folders shown in the following table."},{"key":"dq7a1","type":"atomic","data":{},"depth":0,"inlineStyleRanges":[],"entityRanges":[{"length":1,"offset":0,"key":0}],"text":" "},{"entityRanges":[],"key":"ba1kt","inlineStyleRanges":[],"text":"At 09:00, you create a Microsoft Cloud App Security policy named Policy1 which is shown in the following exhibit.","type":"unstyled","data":{},"depth":0},{"entityRanges":[{"length":1,"key":1,"offset":0}],"data":{},"key":"14nv1","depth":0,"inlineStyleRanges":[],"text":" ","type":"atomic"},{"key":"9eqph","entityRanges":[],"inlineStyleRanges":[],"text":"After you create Policy1, you upload files to Site1 as shown in the following table.","depth":0,"type":"unstyled","data":{}},{"inlineStyleRanges":[],"depth":0,"key":"61lv3","data":{},"text":" ","entityRanges":[{"length":1,"offset":0,"key":2}],"type":"atomic"},{"depth":0,"data":{},"text":"Mark the checkbox next to if the statement if it is true.","type":"unstyled","inlineStyleRanges":[{"length":31,"style":"color-rgb(80,80,80)","offset":26},{"offset":26,"style":"bgcolor-rgb(255,255,255)","length":31},{"length":31,"style":"fontsize-16","offset":26},{"style":"fontfamily-Roboto Condensed\", sans-serif","length":31,"offset":26}],"entityRanges":[],"key":"dpuu0"}],"entityMap":{"0":{"mutability":"MUTABLE","type":"IMAGE","data":{"height":"auto","alt":"Folder File Chart","src":"https://i.ibb.co/3fcDZQY/Folder-File-Chart.png","alignment":"left","width":"auto"}},"1":{"mutability":"MUTABLE","type":"IMAGE","data":{"alt":"Cloud App Security Settings","height":"auto","alignment":"left","width":"auto","src":"https://www.examtopics.com/assets/media/exam-media/03686/0016100001.jpg"}},"2":{"type":"IMAGE","data":{"height":"auto","alignment":"left","width":"auto","src":"https://i.ibb.co/k9YYtBy/file-upload-times-chart.png","alt":"Files upload times chart"},"mutability":"MUTABLE"}}},"references":{"blocks":[{"inlineStyleRanges":[],"type":"unstyled","data":{},"text":"File1 will trigger the alert because it is in Folder1. Then File4, File6, File7, and File8 will trigger the alerts. File 9 won't trigger the alert because the daily alert limit is set to 5.","depth":0,"entityRanges":[],"key":"bmkuh"},{"key":"elndc","type":"unstyled","text":"https://www.gitbit.org/course/ms-500/learn/Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP","entityRanges":[{"offset":0,"key":0,"length":107}],"data":{},"depth":0,"inlineStyleRanges":[]},{"depth":0,"data":{},"entityRanges":[{"key":1,"length":76,"offset":0}],"key":"7erjo","text":"https://docs.microsoft.com/en-us/cloud-app-security/data-protection-policies","inlineStyleRanges":[],"type":"unstyled"}],"entityMap":{"0":{"type":"LINK","data":{"targetOption":"_blank","url":"https://www.gitbit.org/course/ms-500/learn/Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP"},"mutability":"MUTABLE"},"1":{"data":{"url":"https://docs.microsoft.com/en-us/cloud-app-security/data-protection-policies","targetOption":"_blank"},"type":"LINK","mutability":"MUTABLE"}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'dvaW43tNR',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft 365 subscription that contains a Microsoft SharePoint Online site named Site1. Site1 contains the folders shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/3fcDZQY/Folder-File-Chart.png" alt="Folder File Chart" style="height: auto;width: auto"/></div>
<p>At 09:00, you create a Microsoft Cloud App Security policy named Policy1 which is shown in the following exhibit.</p>
<div style="text-align:left;"><img src="https://www.examtopics.com/assets/media/exam-media/03686/0016100001.jpg" alt="Cloud App Security Settings" style="height: auto;width: auto"/></div>
<p>After you create Policy1, you upload files to Site1 as shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/k9YYtBy/file-upload-times-chart.png" alt="Files upload times chart" style="height: auto;width: auto"/></div>
<p>Mark the checkbox next to <span style="color: rgb(80,80,80);background-color: rgb(255,255,255);font-size: 16px;font-family: Roboto Condensed", sans-serif;">if the statement if it is true.</span></p>
`,
      questionText: `You have a Microsoft 365 subscription that contains a Microsoft SharePoint Online site named Site1. Site1 contains the folders shown in the following table. At 09:00, you create a Microsoft Cloud App Security policy named Policy1 which is shown in the following exhibit. After you create Policy1, you upload files to Site1 as shown in the following table. Mark the checkbox next to if the statement if it is true.`,
      referencesHtml: `<p>File1 will trigger the alert because it is in Folder1. Then File4, File6, File7, and File8 will trigger the alerts. File 9 won't trigger the alert because the daily alert limit is set to 5.</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP" target="_blank">https://www.gitbit.org/course/ms-500/learn/Implement-and-manage-Microsoft-Defender-for-Cloud-Apps-7MQ3wE4wP</a></p>
<p><a href="https://docs.microsoft.com/en-us/cloud-app-security/data-protection-policies" target="_blank">https://docs.microsoft.com/en-us/cloud-app-security/data-protection-policies</a></p>
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