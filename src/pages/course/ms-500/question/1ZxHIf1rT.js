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
      question: {"answers":[{"value":"In the Microsoft 365 admin center enable threat management.","isCorrectAnswer":false},{"value":"In the Exchange Admin center create a mail flow rule to block phishing attempts","isCorrectAnswer":false},{"value":"In Security & compliance admin center > Threat Management > Policy > Anti-phishing. Enable the settings.","isCorrectAnswer":true}],"id":"1ZxHIf1rT","question":{"entityMap":{},"blocks":[{"key":"d3cc3","data":{},"entityRanges":[],"text":"You need to protect against phishing attacks. The solution must meet the following requirements:","inlineStyleRanges":[],"depth":0,"type":"unstyled"},{"key":"93hsr","data":{},"text":"Phishing email messages must be quarantined if the messages are sent from a spoofed domain.","depth":0,"type":"unordered-list-item","inlineStyleRanges":[],"entityRanges":[]},{"type":"unordered-list-item","text":"As many phishing email messages as possible must be identified.","depth":0,"entityRanges":[],"inlineStyleRanges":[],"key":"88pl3","data":{}},{"key":"3hl1m","data":{},"depth":0,"type":"unstyled","inlineStyleRanges":[],"entityRanges":[],"text":"The solution must apply to the current SMTP domain names and any domain names added later."},{"type":"unstyled","depth":0,"inlineStyleRanges":[],"text":"What steps should you take to complete the task?","key":"41bh9","data":{},"entityRanges":[]}]},"references":{"blocks":[{"type":"unstyled","text":"https://www.iorad.com/player/1797326/MS-500---You-need-to-protect-against-phishing-attacks-","data":{},"key":"42jki","depth":0,"inlineStyleRanges":[],"entityRanges":[{"length":91,"key":0,"offset":0}]},{"key":"aj23h","data":{},"text":"Open the Security & Compliance Admin center","depth":0,"type":"ordered-list-item","inlineStyleRanges":[],"entityRanges":[]},{"entityRanges":[],"text":"Click Threat Management > Policy > Anti-Phishing > Default policy","inlineStyleRanges":[],"type":"ordered-list-item","data":{},"key":"8i7t1","depth":0},{"key":"1g8r0","data":{},"inlineStyleRanges":[],"text":"Click Edit impersonation policy","entityRanges":[],"type":"ordered-list-item","depth":0},{"depth":0,"type":"ordered-list-item","entityRanges":[],"data":{},"inlineStyleRanges":[],"text":"Go to Add domains to protect.","key":"3t9je"},{"entityRanges":[],"type":"ordered-list-item","data":{},"text":"Enable Automatically include the domains I own","depth":0,"key":"6u4eq","inlineStyleRanges":[]},{"text":"Go to actions","key":"7dag8","type":"ordered-list-item","depth":0,"data":{},"entityRanges":[],"inlineStyleRanges":[]},{"entityRanges":[],"type":"ordered-list-item","text":"Click Don't apply any action and set to Quarantine the message","key":"d694b","data":{},"depth":0,"inlineStyleRanges":[]},{"key":"c4vv5","depth":0,"type":"ordered-list-item","inlineStyleRanges":[],"text":"Go to Mailbox Intelligence","data":{},"entityRanges":[]},{"type":"ordered-list-item","entityRanges":[],"key":"17lmp","depth":0,"data":{},"text":"Click Enable mailbox intelligence-based impersonation protection.","inlineStyleRanges":[]},{"depth":0,"type":"ordered-list-item","data":{},"entityRanges":[],"key":"c2c11","inlineStyleRanges":[],"text":"Click If email is sent by an impersonated user. Set to Quarantine the message."},{"inlineStyleRanges":[],"type":"ordered-list-item","key":"egrsb","entityRanges":[],"data":{},"depth":0,"text":"Save"},{"entityRanges":[{"key":1,"length":94,"offset":0}],"type":"unstyled","inlineStyleRanges":[],"key":"egh8a","data":{},"depth":0,"text":"https://www.gitbit.org/course/ms-500/learn/Protecting-email-against-phishing-attacks-GCOOUsSBT "},{"text":"https://support.office.com/en-us/article/protect-against-phishing-attempts-in-microsoft-365-86c425e1-1686-430a-9151-f7176cce4f2c#ID0EAABAAA=Try_it ","depth":0,"key":"8jkc1","inlineStyleRanges":[],"entityRanges":[{"length":146,"offset":0,"key":2}],"data":{},"type":"unstyled"},{"data":{},"key":"9dqq3","depth":0,"text":"https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/set-up-anti-phishing-policies?view=o365-worldwide#example-anti-phishing-policy-to- protect-a-user-and-a-domain ","entityRanges":[{"length":186,"key":3,"offset":0}],"type":"unstyled","inlineStyleRanges":[]}],"entityMap":{"0":{"mutability":"MUTABLE","data":{"targetOption":"_blank","url":"https://www.iorad.com/player/1797326/MS-500---You-need-to-protect-against-phishing-attacks-"},"type":"LINK"},"1":{"type":"LINK","data":{"targetOption":"_blank","url":"https://www.gitbit.org/course/ms-500/learn/Protecting-email-against-phishing-attacks-GCOOUsSBT"},"mutability":"MUTABLE"},"2":{"data":{"url":"https://support.office.com/en-us/article/protect-against-phishing-attempts-in-microsoft-365-86c425e1-1686-430a-9151-f7176cce4f2c#ID0EAABAAA=Try_it","targetOption":"_blank"},"type":"LINK","mutability":"MUTABLE"},"3":{"data":{"url":"https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/set-up-anti-phishing-policies?view=o365-worldwide#example-anti-phishing-policy-to-","targetOption":"_blank"},"type":"LINK","mutability":"MUTABLE"}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: '1ZxHIf1rT',
      questionIdx: '',
      questionHtml: `<p>You need to protect against phishing attacks. The solution must meet the following requirements:</p>
<ul>
<li>Phishing email messages must be quarantined if the messages are sent from a spoofed domain.</li>
<li>As many phishing email messages as possible must be identified.</li>
</ul>
<p>The solution must apply to the current SMTP domain names and any domain names added later.</p>
<p>What steps should you take to complete the task?</p>
`,
      questionText: `You need to protect against phishing attacks. The solution must meet the following requirements: Phishing email messages must be quarantined if the messages are sent from a spoofed domain. As many phishing email messages as possible must be identified. The solution must apply to the current SMTP domain names and any domain names added later. What steps should you take to complete the task?`,
      referencesHtml: `<p><a href="https://www.iorad.com/player/1797326/MS-500---You-need-to-protect-against-phishing-attacks-" target="_blank">https://www.iorad.com/player/1797326/MS-500---You-need-to-protect-against-phishing-attacks-</a></p>
<ol>
<li>Open the Security &amp; Compliance Admin center</li>
<li>Click Threat Management &gt; Policy &gt; Anti-Phishing &gt; Default policy</li>
<li>Click Edit impersonation policy</li>
<li>Go to Add domains to protect.</li>
<li>Enable Automatically include the domains I own</li>
<li>Go to actions</li>
<li>Click Don't apply any action and set to Quarantine the message</li>
<li>Go to Mailbox Intelligence</li>
<li>Click Enable mailbox intelligence-based impersonation protection.</li>
<li>Click If email is sent by an impersonated user. Set to Quarantine the message.</li>
<li>Save</li>
</ol>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Protecting-email-against-phishing-attacks-GCOOUsSBT" target="_blank">https://www.gitbit.org/course/ms-500/learn/Protecting-email-against-phishing-attacks-GCOOUsSBT</a>&nbsp;</p>
<p><a href="https://support.office.com/en-us/article/protect-against-phishing-attempts-in-microsoft-365-86c425e1-1686-430a-9151-f7176cce4f2c#ID0EAABAAA=Try_it" target="_blank">https://support.office.com/en-us/article/protect-against-phishing-attempts-in-microsoft-365-86c425e1-1686-430a-9151-f7176cce4f2c#ID0EAABAAA=Try_it</a>&nbsp;</p>
<p><a href="https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/set-up-anti-phishing-policies?view=o365-worldwide#example-anti-phishing-policy-to-" target="_blank">https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/set-up-anti-phishing-policies?view=o365-worldwide#example-anti-phishing-policy-to- protect-a-user-and-a-domain</a>&nbsp;</p>
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
        url: 'https://www.gitbit.org/course/ms-500/question/1ZxHIf1rT',
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
