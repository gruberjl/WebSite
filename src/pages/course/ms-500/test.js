import * as React from "react"
import Page from '../../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link, navigate } from "gatsby"
import {getDb, onAuthStateChanged, getDoc} from '../../../components/firebase'

const isBrowser = () => typeof window !== 'undefined'

class TestPage extends React.Component {
  constructor(props) {
    super(props)
    this.setUid = this.setUid.bind(this)

    if (isBrowser()) {
      this.db = getDb()
    }

    const params = new URLSearchParams(props.location.search)

    this.state = {
      docs: [],
      testId: params.get('testid'),
      nextQuestionId: ''
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
        console.log(test.questions[0])
        this.setState({
          test,
          nextQuestionId: test.questions[0].id
        })
      })
    } else {
      navigate("/login")
    }
  }

  render() {
    return (
      <Page title={'Ready to begin your exam?'} description={'Microsoft 365 MS-500 practice test prep page'}>
        <main>
          <div>
            <Container>
              <Row>
                <Col>
                  <h1>MS-500 Test</h1>
                  <h2>Skills measured</h2>
                  <ul>
                    <li>Implement and manage identity and access (30-35%)</li>
                    <li>Implement and manage threat protection (20-25%)</li>
                    <li>Implement and manage information protection (15-20%)</li>
                    <li>Manage governance and compliance features in Microsoft 365 (25-30%)</li>
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col>
                  { this.state.nextQuestionId ?
                    <Button as={Link} variant="primary" size="lg" to={`/course/ms-500/question/${this.state.nextQuestionId}?testId=${this.state.testId}`}>Start Test</Button> :
                    <span>Please wait for the test to load</span>
                  }
                </Col>
              </Row>
            </Container>
          </div>
        </main>
      </Page>
    )
  }
}

export default TestPage
