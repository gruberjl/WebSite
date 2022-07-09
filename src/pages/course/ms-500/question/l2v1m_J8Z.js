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
      question: {"answers":[{"value":"External users can access File1","isCorrectAnswer":false},{"value":"The users in contoso.com can access File2","isCorrectAnswer":false},{"value":"External users can access File3","isCorrectAnswer":false}],"id":"l2v1m_J8Z","question":{"blocks":[{"key":"50gpj","data":{},"inlineStyleRanges":[],"type":"unstyled","depth":0,"entityRanges":[],"text":"You have a Microsoft 365 subscription that uses an Azure Active Directory (Azure AD) tenant named contoso.com."},{"data":{},"type":"unstyled","entityRanges":[],"key":"260nn","text":"OneDrive stores files that are shared with external users. The files are configured as shown in the following table.","depth":0,"inlineStyleRanges":[]},{"inlineStyleRanges":[],"key":"euhdj","text":" ","depth":0,"type":"atomic","entityRanges":[{"length":1,"key":0,"offset":0}],"data":{}},{"depth":0,"type":"unstyled","key":"a6paf","data":{},"text":"You create a data loss prevention (DLP) policy that applies to the content stored in OneDrive accounts. The policy contains the following three rules:","entityRanges":[],"inlineStyleRanges":[]},{"text":"Rule1:","inlineStyleRanges":[{"offset":0,"style":"BOLD","length":5}],"key":"6vh9m","entityRanges":[],"type":"unstyled","depth":0,"data":{}},{"entityRanges":[],"key":"1ui6b","text":"Conditions: Label1, Detect content that's shared with people outside my organization","data":{},"depth":0,"inlineStyleRanges":[],"type":"unordered-list-item"},{"depth":0,"entityRanges":[],"text":"Actions: Restrict access to the content for external users","data":{},"inlineStyleRanges":[],"key":"5q0vt","type":"unordered-list-item"},{"key":"ervr","type":"unordered-list-item","inlineStyleRanges":[],"text":"User notifications: Notify the user who last modified the content","entityRanges":[],"data":{},"depth":0},{"entityRanges":[],"text":"User overrides: On","data":{},"type":"unordered-list-item","depth":0,"key":"cv2dv","inlineStyleRanges":[]},{"entityRanges":[],"text":"Priority: 0","data":{},"inlineStyleRanges":[],"type":"unordered-list-item","key":"av8gm","depth":0},{"entityRanges":[],"text":"Rule2:","type":"unstyled","depth":0,"key":"og34","inlineStyleRanges":[{"style":"BOLD","length":5,"offset":0}],"data":{}},{"data":{},"depth":0,"text":"Conditions: Label1 or Label2","type":"unordered-list-item","entityRanges":[],"key":"cjeds","inlineStyleRanges":[]},{"inlineStyleRanges":[],"key":"854sf","entityRanges":[],"text":"Actions: Restrict access to the content","type":"unordered-list-item","depth":0,"data":{}},{"type":"unordered-list-item","entityRanges":[],"text":"Priority: 1","data":{},"key":"3s1li","depth":0,"inlineStyleRanges":[]},{"type":"unstyled","data":{},"inlineStyleRanges":[{"style":"BOLD","length":5,"offset":0}],"entityRanges":[],"key":"5ujn5","depth":0,"text":"Rule3:"},{"depth":0,"type":"unordered-list-item","entityRanges":[],"inlineStyleRanges":[],"data":{},"key":"f2jcf","text":"Conditions: Label2, Detect content that's shared with people outside my organization"},{"type":"unordered-list-item","inlineStyleRanges":[],"text":"Actions: Restrict access to the content for external users","entityRanges":[],"key":"4rk5n","data":{},"depth":0},{"entityRanges":[],"type":"unordered-list-item","key":"6lr8c","data":{},"depth":0,"inlineStyleRanges":[],"text":"User notifications: Notify the user who last modified the content"},{"depth":0,"text":"User overrides: On","key":"7iado","inlineStyleRanges":[],"type":"unordered-list-item","entityRanges":[],"data":{}},{"type":"unordered-list-item","data":{},"entityRanges":[],"key":"1mk1m","depth":0,"inlineStyleRanges":[],"text":"Priority: 2"},{"depth":0,"text":"For each of the following statements, check the box if the statement is true.","key":"4p8lg","inlineStyleRanges":[],"data":{},"type":"unstyled","entityRanges":[]}],"entityMap":{"0":{"mutability":"MUTABLE","type":"IMAGE","data":{"alt":"Files and labels chart","height":"auto","width":"auto","src":"https://i.ibb.co/rMYDH1g/file-labels.png","alignment":"left"}}}},"references":{"entityMap":{"0":{"mutability":"MUTABLE","data":{"targetOption":"_blank","url":"https://www.gitbit.org/course/ms-500/learn/Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w"},"type":"LINK"}},"blocks":[{"entityRanges":[],"depth":0,"inlineStyleRanges":[],"text":"All of them will match Rule2 because it is the most restrictive.","type":"unstyled","data":{},"key":"5t3am"},{"text":"https://www.gitbit.org/course/ms-500/learn/Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w","depth":0,"entityRanges":[{"offset":0,"key":0,"length":116}],"key":"eu9vf","data":{},"type":"unstyled","inlineStyleRanges":[]}]}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'l2v1m_J8Z',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft 365 subscription that uses an Azure Active Directory (Azure AD) tenant named contoso.com.</p>
<p>OneDrive stores files that are shared with external users. The files are configured as shown in the following table.</p>
<div style="text-align:left;"><img src="https://i.ibb.co/rMYDH1g/file-labels.png" alt="Files and labels chart" style="height: auto;width: auto"/></div>
<p>You create a data loss prevention (DLP) policy that applies to the content stored in OneDrive accounts. The policy contains the following three rules:</p>
<p><strong>Rule1</strong>:</p>
<ul>
<li>Conditions: Label1, Detect content that's shared with people outside my organization</li>
<li>Actions: Restrict access to the content for external users</li>
<li>User notifications: Notify the user who last modified the content</li>
<li>User overrides: On</li>
<li>Priority: 0</li>
</ul>
<p><strong>Rule2</strong>:</p>
<ul>
<li>Conditions: Label1 or Label2</li>
<li>Actions: Restrict access to the content</li>
<li>Priority: 1</li>
</ul>
<p><strong>Rule3</strong>:</p>
<ul>
<li>Conditions: Label2, Detect content that's shared with people outside my organization</li>
<li>Actions: Restrict access to the content for external users</li>
<li>User notifications: Notify the user who last modified the content</li>
<li>User overrides: On</li>
<li>Priority: 2</li>
</ul>
<p>For each of the following statements, check the box if the statement is true.</p>
`,
      questionText: `You have a Microsoft 365 subscription that uses an Azure Active Directory (Azure AD) tenant named contoso.com. OneDrive stores files that are shared with external users. The files are configured as shown in the following table. You create a data loss prevention (DLP) policy that applies to the content stored in OneDrive accounts. The policy contains the following three rules: Rule1: Conditions: Label1, Detect content that's shared with people outside my organization Actions: Restrict access to the content for external users User notifications: Notify the user who last modified the content User overrides: On Priority: 0 Rule2: Conditions: Label1 or Label2 Actions: Restrict access to the content Priority: 1 Rule3: Conditions: Label2, Detect content that's shared with people outside my organization Actions: Restrict access to the content for external users User notifications: Notify the user who last modified the content User overrides: On Priority: 2 For each of the following statements, check the box if the statement is true.`,
      referencesHtml: `<p>All of them will match Rule2 because it is the most restrictive.</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w" target="_blank">https://www.gitbit.org/course/ms-500/learn/Preventing-accidental-and-malicious-data-loss-with-DLP-policies-IsPGsme8w</a></p>
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
