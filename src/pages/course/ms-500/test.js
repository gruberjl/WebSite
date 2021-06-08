import * as React from "react"
import Page from '../../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link, navigate } from "gatsby"
import firebase from 'gatsby-plugin-firebase-app'

class TestPage extends React.Component {
  constructor(props) {
    super(props)
    this.setUid = this.setUid.bind(this)

    this.db = firebase.firestore()
    const params = new URLSearchParams(props.location.search)

    this.state = {
      docs: [],
      testId: params.get('testid'),
      nextQuestionId: ''
    }

    const isBrowser = () => typeof window !== 'undefined'

    if (isBrowser()) {
      firebase.auth().onAuthStateChanged(this.setUid)
    }
  }

  setUid(user) {
    if (user) {
      this.setState({
        uid: user.uid
      })

      this.db.collection("users").doc(this.state.uid).collection('tests').doc(this.state.testId).get().then(doc => {
        const test = doc.data()
        test.id = doc.id
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
      <Page>
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
