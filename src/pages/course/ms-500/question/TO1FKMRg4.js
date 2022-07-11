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
      question: {"answers":[{"value":"Yes","isCorrectAnswer":false},{"isCorrectAnswer":true,"value":"No"}],"id":"TO1FKMRg4","question":{"blocks":[{"data":{},"depth":0,"type":"unstyled","inlineStyleRanges":[],"text":"You have a Microsoft 365 subscription.","entityRanges":[],"key":"7qt30"},{"inlineStyleRanges":[],"depth":0,"text":"You have a user named User1. Several users have full access to the mailbox of User1.","entityRanges":[],"type":"unstyled","key":"fi95c","data":{}},{"data":{},"inlineStyleRanges":[],"depth":0,"entityRanges":[],"type":"unstyled","text":"Some email messages sent to User1 appear to have been read and deleted before the user viewed them.","key":"cafcm"},{"depth":0,"entityRanges":[],"key":"1srna","data":{},"inlineStyleRanges":[],"text":"When you search the audit log in Security & Compliance to identify who signed in to the mailbox of User1, the results are blank.","type":"unstyled"},{"entityRanges":[],"data":{},"type":"unstyled","depth":0,"inlineStyleRanges":[],"key":"47tgb","text":"You need to ensure that you can view future sign-ins to the mailbox of User1."},{"text":"You run the Set-AdminAuditLogConfig -AdminAuditLogEnabled $true -AdminAuditLogCmdlets *Mailbox* command.","type":"unstyled","inlineStyleRanges":[{"offset":12,"length":83,"style":"BOLD"}],"entityRanges":[],"data":{},"depth":0,"key":"56r3g"},{"type":"unstyled","depth":0,"data":{},"entityRanges":[],"text":"Does that meet the goal?","key":"fpjcu","inlineStyleRanges":[]}],"entityMap":{}},"references":{"blocks":[{"entityRanges":[],"type":"unstyled","inlineStyleRanges":[],"depth":0,"key":"addi5","text":"To enable Exchange auditing we'll need to use PowerShell.","data":{}},{"type":"unstyled","depth":0,"data":{},"key":"c980p","inlineStyleRanges":[],"entityRanges":[],"text":"1. Open PowerShell and connect to Exchange Online using Connect-ExchangeOnline."},{"text":"2. Run the following command \"Set-AdminAuditLogConfig -AdminAuditLogEnabled $true -AdminAuditLogCmdlets * -AdminAuditLogParameters *\"","entityRanges":[],"data":{},"depth":0,"inlineStyleRanges":[],"key":"898ib","type":"unstyled"},{"entityRanges":[],"text":"3. Then run the following command \"Set-OrganizationConfig -AuditDisabled $false\"","key":"3cjkc","depth":0,"inlineStyleRanges":[],"type":"unstyled","data":{}},{"depth":0,"inlineStyleRanges":[],"text":"You can also replace step 3 with the following: Set-Mailbox -Identity \"User1 \" -AuditDelegate @{Add=\"MailboxLogin\"}","type":"unstyled","key":"3s83k","entityRanges":[],"data":{}},{"inlineStyleRanges":[],"depth":0,"text":"https://www.gitbit.org/course/ms-500/learn/Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1","key":"2qcvr","entityRanges":[{"key":0,"offset":0,"length":105}],"data":{},"type":"unstyled"},{"text":"https://docs.microsoft.com/en-us/powershell/module/exchange/policy-and-compliance-audit/set-adminauditlogconfig?view=exchange-ps","depth":0,"data":{},"entityRanges":[{"key":1,"length":128,"offset":0}],"type":"unstyled","key":"cd35f","inlineStyleRanges":[]},{"entityRanges":[{"key":2,"length":101,"offset":0}],"depth":0,"type":"unstyled","key":"2eq4a","data":{},"inlineStyleRanges":[],"text":"https://docs.microsoft.com/en-us/microsoft-365/compliance/enable-mailbox-auditing?view=o365-worldwide "},{"text":"The correct answer is to run the following commands:","entityRanges":[],"data":{},"type":"unstyled","inlineStyleRanges":[],"depth":0,"key":"bboou"},{"depth":0,"key":"5519u","inlineStyleRanges":[],"text":"Set-OrganizationConfig -AuditDisabled $False","data":{},"entityRanges":[],"type":"unstyled"},{"text":"Set-Mailbox -Identity \"User1 \" -AuditDelegate @{Add=\"MailboxLogin\"}","inlineStyleRanges":[{"length":5,"style":"color-rgb(33,37,41)","offset":23},{"style":"bgcolor-rgb(255,255,255)","offset":23,"length":5},{"offset":23,"style":"fontsize-16","length":5},{"style":"fontfamily-system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji","length":5,"offset":23}],"data":{},"entityRanges":[],"depth":0,"type":"unstyled","key":"76lv"}],"entityMap":{"0":{"type":"LINK","data":{"targetOption":"_blank","url":"https://www.gitbit.org/course/ms-500/learn/Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1"},"mutability":"MUTABLE"},"1":{"type":"LINK","mutability":"MUTABLE","data":{"targetOption":"_blank","url":"https://docs.microsoft.com/en-us/powershell/module/exchange/policy-and-compliance-audit/set-adminauditlogconfig?view=exchange-ps"}},"2":{"type":"LINK","data":{"url":"https://docs.microsoft.com/en-us/microsoft-365/compliance/enable-mailbox-auditing?view=o365-worldwide","targetOption":"_blank"},"mutability":"MUTABLE"}}}},
      previousQuestionId: '',
      nextQuestionId: '',
      questionId: 'TO1FKMRg4',
      questionIdx: '',
      questionHtml: `<p>You have a Microsoft 365 subscription.</p>
<p>You have a user named User1. Several users have full access to the mailbox of User1.</p>
<p>Some email messages sent to User1 appear to have been read and deleted before the user viewed them.</p>
<p>When you search the audit log in Security &amp; Compliance to identify who signed in to the mailbox of User1, the results are blank.</p>
<p>You need to ensure that you can view future sign-ins to the mailbox of User1.</p>
<p>You run the <strong>Set-AdminAuditLogConfig -AdminAuditLogEnabled $true -AdminAuditLogCmdlets *Mailbox*</strong> command.</p>
<p>Does that meet the goal?</p>
`,
      questionText: `You have a Microsoft 365 subscription. You have a user named User1. Several users have full access to the mailbox of User1. Some email messages sent to User1 appear to have been read and deleted before the user viewed them. When you search the audit log in Security & Compliance to identify who signed in to the mailbox of User1, the results are blank. You need to ensure that you can view future sign-ins to the mailbox of User1. You run the Set-AdminAuditLogConfig -AdminAuditLogEnabled $true -AdminAuditLogCmdlets *Mailbox* command. Does that meet the goal?`,
      referencesHtml: `<p>To enable Exchange auditing we'll need to use PowerShell.</p>
<p>1. Open PowerShell and connect to Exchange Online using Connect-ExchangeOnline.</p>
<p>2. Run the following command "Set-AdminAuditLogConfig -AdminAuditLogEnabled $true -AdminAuditLogCmdlets * -AdminAuditLogParameters *"</p>
<p>3. Then run the following command "Set-OrganizationConfig -AuditDisabled $false"</p>
<p>You can also replace step 3 with the following: Set-Mailbox -Identity "User1 " -AuditDelegate @{Add="MailboxLogin"}</p>
<p><a href="https://www.gitbit.org/course/ms-500/learn/Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1" target="_blank">https://www.gitbit.org/course/ms-500/learn/Auditing-sign-ins-and-other-actions-in-Microsoft-365-sH_Ee1DW1</a></p>
<p><a href="https://docs.microsoft.com/en-us/powershell/module/exchange/policy-and-compliance-audit/set-adminauditlogconfig?view=exchange-ps" target="_blank">https://docs.microsoft.com/en-us/powershell/module/exchange/policy-and-compliance-audit/set-adminauditlogconfig?view=exchange-ps</a></p>
<p><a href="https://docs.microsoft.com/en-us/microsoft-365/compliance/enable-mailbox-auditing?view=o365-worldwide" target="_blank">https://docs.microsoft.com/en-us/microsoft-365/compliance/enable-mailbox-auditing?view=o365-worldwide</a>&nbsp;</p>
<p>The correct answer is to run the following commands:</p>
<p>Set-OrganizationConfig -AuditDisabled $False</p>
<p>Set-Mailbox -Identity "<span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">User1</span> " -AuditDelegate @{Add="MailboxLogin"}</p>
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
