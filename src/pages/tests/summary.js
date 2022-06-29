import React from "react"
import { convertFromRaw } from 'draft-js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link, navigate } from "gatsby"
import {onAuthStateChanged, getDoc, saveDoc} from '../../components/firebase'
import Page from '../../components/page'
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im"

const checkedBoxSyle = {
  color: 'green',
  marginRight: '12px'
}

const uncheckedBoxSyle = {
  color: 'red',
  marginRight: '12px'
}

const isBrowser = () => typeof window !== 'undefined'

export default class TestsSummary extends React.Component {
  constructor(props) {
    super(props)
    this.setUid = this.setUid.bind(this)
    this.gradeTest = this.gradeTest.bind(this)

    const params = new URLSearchParams(props.location.search)

    this.state = {
      test: {},
      uid: '',
      testId: params.get('testId'),
      questions: []
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

      getDoc(`users/${this.state.uid}/tests`, this.state.testId).then(test => {
        this.setState({test})
        const questions = this.state.questions
          test.questions.forEach(testQuestion => {
            getDoc(`Tests/MS-500/Questions`, testQuestion.id).then(question => {
              question.text = convertFromRaw(question.question).getPlainText().substring(0, 25)
              question.answered = testQuestion.answered

              if (!test.isGraded && test.isComplete) {
                const {maxPoints, pointsReceived} = this.gradeQuestion(question, testQuestion.answered || [])
                question.maxPoints = maxPoints
                question.pointsReceived = pointsReceived
                questions.push(question)

                if (questions.length >= test.questions.length)
                  this.gradeTest(test, questions)
              } else {
                questions.push(question)
              }
              this.setState({questions})
            })
          })
      })
    } else {
      navigate("/login")
    }
  }

  gradeQuestion(question, answers) {
    const maxPoints = question.answers.filter((answer) => answer.isCorrectAnswer === true).length
    let pointsReceived = 0

    answers.forEach((answer) => {
      const questionAnswer = question.answers[answer]
      if (questionAnswer.isCorrectAnswer)
        pointsReceived++
      else
        pointsReceived--
    })

    if (pointsReceived < 0)
      pointsReceived = 0

    return {maxPoints, pointsReceived}
  }

  gradeTest(test, questions) {
    let maxPoints = 0
    let pointsReceived = 0
    questions.forEach(question => {
      maxPoints += question.maxPoints
      pointsReceived += question.pointsReceived
    })

    test.isGraded = true
    test.score = Math.round(pointsReceived / maxPoints * 1000)

    saveDoc(`users/${this.state.uid}/tests`, test)

    this.setState(test)
  }

  render() {
    const questions = this.state.questions
    return (
      <Page title={'Microsoft 365 MS-500 practice test summary'} description={'Microsoft 365 MS-500 practice test summary'}>
        <main>
          <Container>
            <Row className='box'>
              <Col xs={6} className='box-row'>
                <strong>Exam Number:</strong> MS-500
              </Col>
              <Col xs={6} className='box-row'>
                <strong>Passing Score:</strong> 700
              </Col>
              <Col xs={6} className='box-row'>
                <strong>Your Score:</strong> {this.state.test.score}
              </Col>
              <Col xs={6} className='box-row'>
                <strong>Result:</strong> {
                  this.state.test.score ?
                    (this.state.test.score > 700 ? 'Pass' : 'Fail') :
                    ''
                }
              </Col>
            </Row>
            <Row>
              <Col xs={10}>
                <h1>Test Sumary</h1>
              </Col>
              { this.state.test.isComplete ?
                '' :
                <Col xs={2}>
                  <Button>Grade Test</Button>
                </Col>
              }
            </Row>
            <Row>
              { questions.map((question, idx) => (
                <Col xs={6} md={4} key={idx} title={question.answered && question.answered.length > 0 ? ( question.maxPoints === question.pointsReceived ? 'Answered correctly' : 'Answered incorrectly' ) : 'Not answered'}>
                  { question.answered && question.answered.length > 0 ?
                      ( question.maxPoints === question.pointsReceived ?
                          <ImCheckboxChecked style={checkedBoxSyle} /> :
                          <ImCheckboxChecked style={uncheckedBoxSyle} /> ) :
                      <ImCheckboxUnchecked style={uncheckedBoxSyle} />
                  }
                  <Button as={Link} variant="link" size="lg" to={`/course/ms-500/question/${question.id}?testId=${this.state.testId}`}>{idx+1}. {question.text}</Button>
                </Col>
              ))}
            </Row>
          </Container>
        </main>
      </Page>
    )
  }
}
