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
      question: {"answers":[{"value":"Set the frequency to One time","isCorrectAnswer":false},{"value":"Set the frequency to Weekly","isCorrectAnswer":true},{"value":"Set the frequency to Monthly","isCorrectAnswer":false},{"value":"To ensure that access is removed if an administrator fails to respond, configure the: Upon completion settings","isCorrectAnswer":true},{"value":"To ensure that access is removed if an administrator fails to respond, configure the: Advanced settings","isCorrectAnswer":false},{"isCorrectAnswer":false,"value":"To ensure that access is removed if an administrator fails to respond, configure the: Programs"},{"isCorrectAnswer":false,"value":"To ensure that access is removed if an administrator fails to respond, configure the: Reviewers"}],"id":"HHipoVYNs","question":{"blocks":[{"depth":0,"inlineStyleRanges":[{"style":"BOLD","length":23,"offset":0}],"key":"312gb","entityRanges":[],"data":{},"text":"Security Requirements: GitBit identifies the following security requirements:","type":"unstyled"},{"data":{},"inlineStyleRanges":[],"type":"unordered-list-item","depth":0,"key":"c0t0v","text":"Access to the Azure Active Directory admin center by the user administrators must be reviewed every seven days. If an administrator fails to respond to an access request within three days, access must be removed","entityRanges":[]},{"type":"unordered-list-item","entityRanges":[],"data":{},"text":"Users who manage Microsoft 365 workloads must only be allowed to perform administrative tasks for up to three hours at a time. Global administrators must be exempt from this requirement","inlineStyleRanges":[],"key":"4kl8j","depth":0},{"entityRanges":[],"type":"unordered-list-item","data":{},"key":"7n342","depth":0,"inlineStyleRanges":[],"text":"Users must be prevented from inviting external users to view company data. Only global administrators and a user named User1 must be able to send invitations"},{"type":"unordered-list-item","key":"4v2gu","entityRanges":[],"depth":0,"text":"Azure Advanced Threat Protection (ATP) must capture security group modifications for sensitive groups, such as Domain Admins in Active Directory","inlineStyleRanges":[],"data":{}},{"type":"unordered-list-item","key":"c5gnj","inlineStyleRanges":[],"data":{},"entityRanges":[],"text":"Workload administrators must use multi-factor authentication (MFA) when signing in from an anonymous or an unfamiliar location","depth":0},{"text":"The location of the user administrators must be audited when the administrators authenticate to Azure AD","entityRanges":[],"depth":0,"type":"unordered-list-item","data":{},"key":"cmhvm","inlineStyleRanges":[]},{"text":"Email messages that include attachments containing malware must be delivered without the attachment","inlineStyleRanges":[],"data":{},"type":"unordered-list-item","entityRanges":[],"key":"ad81j","depth":0},{"type":"unordered-list-item","text":"The principle of least privilege must be used whenever possible","entityRanges":[],"inlineStyleRanges":[],"key":"3v1so","depth":0,"data":{}},{"data":{},"text":"You plan to configure an access review to meet the security requirements for the workload administrators. You create an access review policy and specify the scope and a group.","depth":0,"inlineStyleRanges":[],"entityRanges":[],"key":"f6ml2","type":"unstyled"},{"text":"Which other settings should you configure? To answer, select the appropriate options in the answer area.","data":{},"inlineStyleRanges":[],"depth":0,"entityRanges":[],"key":"8jjma","type":"unstyled"}],"entityMap":{}},"references":{"entityMap":{"0":{"data":{"url":"https://www.gitbit.org/course/ms-500/learn/Automating-Access-Review-in-Microsoft-365-rK48f6iM2","targetOption":"_blank"},"mutability":"MUTABLE","type":"LINK"}},"blocks":[{"inlineStyleRanges":[],"type":"unstyled","depth":0,"data":{},"text":"Setting the frequency to weekly allows you to review the roles every 7 days.","key":"ao1ti","entityRanges":[]},{"depth":0,"type":"unstyled","entityRanges":[],"inlineStyleRanges":[],"key":"a38rm","data":{},"text":"You set the access to be removed under \"Upon completion settings\""},{"depth":0,"data":{},"entityRanges":[{"length":94,"key":0,"offset":0}],"text":"https://www.gitbit.org/course/ms-500/learn/Automating-Access-Review-in-Microsoft-365-rK48f6iM2","type":"unstyled","key":"beg9g","inlineStyleRanges":[]}]}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'HHipoVYNs',
      questionIdx: '',
      questionHtml: `<p><strong>Security Requirements: </strong>GitBit identifies the following security requirements:</p>
<ul>
<li>Access to the Azure Active Directory admin center by the user administrators must be reviewed every seven days. If an administrator fails to respond to an access request within three days, access must be removed</li>
<li>Users who manage Microsoft 365 workloads must only be allowed to perform administrative tasks for up to three hours at a time. Global administrators must be exempt from this requirement</li>
<li>Users must be prevented from inviting external users to view company data. Only global administrators and a user named User1 must be able to send invitations</li>
<li>Azure Advanced Threat Protection (ATP) must capture security group modifications for sensitive groups, such as Domain Admins in Active Directory</li>
<li>Workload administrators must use multi-factor authentication (MFA) when signing in from an anonymous or an unfamiliar location</li>
<li>The location of the user administrators must be audited when the administrators authenticate to Azure AD</li>
<li>Email messages that include attachments containing malware must be delivered without the attachment</li>
<li>The principle of least privilege must be used whenever possible</li>
</ul>
<p>You plan to configure an access review to meet the security requirements for the workload administrators. You create an access review policy and specify the scope and a group.</p>
<p>Which other settings should you configure? To answer, select the appropriate options in the answer area.</p>
`,
      questionText: `Security Requirements: GitBit identifies the following security requirements: Access to the Azure Active Directory admin center by the user administrators must be reviewed every seven days. If an administrator fails to respond to an access request within three days, access must be removed Users who manage Microsoft 365 workloads must only be allowed to perform administrative tasks for up to three hours at a time. Global administrators must be exempt from this requirement Users must be prevented from inviting external users to view company data. Only global administrators and a user named User1 must be able to send invitations Azure Advanced Threat Protection (ATP) must capture security group modifications for sensitive groups, such as Domain Admins in Active Directory Workload administrators must use multi-factor authentication (MFA) when signing in from an anonymous or an unfamiliar location The location of the user administrators must be audited when the administrators authenticate to Azure AD Email messages that include attachments containing malware must be delivered without the attachment The principle of least privilege must be used whenever possible You plan to configure an access review to meet the security requirements for the workload administrators. You create an access review policy and specify the scope and a group. Which other settings should you configure? To answer, select the appropriate options in the answer area.`,
      referencesHtml: `<p>Setting the frequency to weekly allows you to review the roles every 7 days.</p>
<p>You set the access to be removed under "Upon completion settings"</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Automating-Access-Review-in-Microsoft-365-rK48f6iM2" target="_blank">https://www.gitbit.org/course/ms-500/learn/Automating-Access-Review-in-Microsoft-365-rK48f6iM2</a></p>
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
