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
      question: {"answers":[{"isCorrectAnswer":false,"value":"From a web browser on Computer1, you can open http://www.contoso.com"},{"isCorrectAnswer":true,"value":"From a web browser on Computer1, you can open http://litwareinc.com/public"},{"isCorrectAnswer":false,"value":"From a web browser on Computer2, you can open http://litwareinc.com"}],"id":"1SP5372Ue","question":{"entityMap":{"0":{"data":{"src":"https://i.ibb.co/7yyjVHL/table1.png","height":"auto","alignment":"left","alt":"Table showing Computer names and tags","width":"auto"},"mutability":"MUTABLE","type":"IMAGE"},"1":{"data":{"height":"auto","alignment":"left","alt":"Machine groups showing name and rules","src":"https://i.ibb.co/Gcc2Bz3/machine-groups.png","width":"auto"},"mutability":"MUTABLE","type":"IMAGE"},"2":{"type":"IMAGE","data":{"alt":"Domain chart","alignment":"left","width":"auto","height":"auto","src":"https://i.ibb.co/9pcMnNM/domain-chart.png"},"mutability":"MUTABLE"}},"blocks":[{"key":"4i6uh","type":"unstyled","text":"You have a Microsoft Defender for Endpoint deployment that has the custom network indicators turned on.","entityRanges":[],"depth":0,"data":{},"inlineStyleRanges":[]},{"text":"Microsoft Defender for Endpoint protects two computers that run Windows 10 as shown in the following table.","inlineStyleRanges":[],"type":"unstyled","entityRanges":[],"depth":0,"key":"8ikhv","data":{}},{"entityRanges":[{"length":1,"key":0,"offset":0}],"data":{},"type":"atomic","depth":0,"text":" ","key":"8bf9d","inlineStyleRanges":[]},{"type":"unstyled","entityRanges":[],"depth":0,"data":{},"key":"8g8is","inlineStyleRanges":[],"text":"Microsoft Defender for Endpoint has the machine groups shown in the following table."},{"entityRanges":[{"length":1,"offset":0,"key":1}],"type":"atomic","data":{},"depth":0,"inlineStyleRanges":[],"key":"2u05u","text":" "},{"data":{},"inlineStyleRanges":[],"text":"From the Microsoft Defender admin center, you create the URLs/Domains indicators shown in the following table.","entityRanges":[],"key":"1etnr","depth":0,"type":"unstyled"},{"inlineStyleRanges":[],"key":"2qlef","entityRanges":[{"offset":0,"key":2,"length":1}],"type":"atomic","text":" ","depth":0,"data":{}},{"inlineStyleRanges":[],"key":"1neb1","entityRanges":[],"depth":0,"text":"For each of the following statements, check the box if the statement is true.","data":{},"type":"unstyled"}]},"references":{"blocks":[{"key":"5tlk3","data":{},"depth":0,"text":"Computer1 has a tag of Kiosk1 which makes Computer1 part of Group1. Group1 is blocked from accessing http://www.contoso.com","entityRanges":[],"type":"unstyled","inlineStyleRanges":[]},{"key":"5gq38","data":{},"entityRanges":[],"depth":0,"inlineStyleRanges":[],"text":"All machines are allowed to access http://litwareinc.com/public so Computer1 can access http://litwareinc.com/public.","type":"unstyled"},{"text":"Computer2's name ends with 2 and has a tag of tag1 so computer2 is part of Group2. Group2 is blocked from accessing http://litwareinc.com","depth":0,"type":"unstyled","data":{},"entityRanges":[],"key":"9rtqg","inlineStyleRanges":[]},{"text":"https://www.gitbit.org/course/ms-500/learn/Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T ","key":"c4854","entityRanges":[{"length":129,"offset":0,"key":0}],"depth":0,"type":"unstyled","inlineStyleRanges":[],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://www.gitbit.org/course/ms-500/learn/Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T","targetOption":"_blank"}}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: '1SP5372Ue',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft Defender for Endpoint deployment that has the custom network indicators turned on.</p>
<p>Microsoft Defender for Endpoint protects two computers that run Windows 10 as shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/7yyjVHL/table1.png" alt="Table showing Computer names and tags" style="height: auto;width: auto"/></div>
<p>Microsoft Defender for Endpoint has the machine groups shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/Gcc2Bz3/machine-groups.png" alt="Machine groups showing name and rules" style="height: auto;width: auto"/></div>
<p>From the Microsoft Defender admin center, you create the URLs/Domains indicators shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/9pcMnNM/domain-chart.png" alt="Domain chart" style="height: auto;width: auto"/></div>
<p>For each of the following statements, check the box if the statement is true.</p>
`,
      questionText: `You have a Microsoft Defender for Endpoint deployment that has the custom network indicators turned on. Microsoft Defender for Endpoint protects two computers that run Windows 10 as shown in the following table. Microsoft Defender for Endpoint has the machine groups shown in the following table. From the Microsoft Defender admin center, you create the URLs/Domains indicators shown in the following table. For each of the following statements, check the box if the statement is true.`,
      referencesHtml: `<p>Computer1 has a tag of Kiosk1 which makes Computer1 part of Group1. Group1 is blocked from accessing http://www.contoso.com</p>
<p>All machines are allowed to access http://litwareinc.com/public so Computer1 can access http://litwareinc.com/public.</p>
<p>Computer2's name ends with 2 and has a tag of tag1 so computer2 is part of Group2. Group2 is blocked from accessing http://litwareinc.com</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T" target="_blank">https://www.gitbit.org/course/ms-500/learn/Protecting-Windows-10-and-other-devices-with-Microsoft-Defender-for-Endpoint-z0qPG6v4T</a>&nbsp;</p>
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
        url: 'https://www.gitbit.org/course/ms-500/question/1SP5372Ue',
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
