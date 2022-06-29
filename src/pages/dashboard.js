import * as React from "react"
import Page from '../components/page'
import { navigate, Link } from "gatsby"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {onAuthStateChanged, getDoc} from '../components/firebase'
import ContentsRead from '../components/contents-read'
import MyTests from '../components/my-tests'
import {contents} from '../data'

const isBrowser = () => typeof window !== 'undefined'

const getNextContent = (completedContent) => {
  if (completedContent.length === 0)
    return contents[0]

  const idx = contents.findIndex(content => completedContent.indexOf(content.id) === -1)
  if (idx === -1)
    return {isComplete:true}

  return contents[idx]
}
 
export default function DashboardPage() {
  const [uid, setUid] = React.useState('')
  const [userAcct, setUserAcct] = React.useState({completedContent: []})
  const [nextContent, setNextContent] = React.useState(contents[0])

  React.useEffect(() => {
    if (isBrowser()) {
      const onAuthStateChangedListener = onAuthStateChanged(user => {
        if (user) {
          setUid(user.uid)
          getDoc('courses/MS-500/users', user.uid).then((userAcct) => {
            if (!userAcct.completedContent) {
              userAcct.completedContent = []
            }
            setUserAcct(userAcct)
            setNextContent(getNextContent(userAcct.completedContent))
          })
        } else {
          navigate('/login')
        }
      })

      return () => onAuthStateChangedListener()
    }
  }, [])

  return (
    <Page title={'MS-500 Dashboard'}>
      <main>
        <Container>
          <Row>
            <Col>
              <h1 className='margin-top40'>MS-500 Dashboard</h1>
            </Col>
          </Row>
          <Row>
            <Col sm={12} lg={{span: 3, offset:4}}>
              <Card>
                { nextContent.isComplete
                  ? ''
                  : <Card.Img variant="top" src={nextContent.featuredImage} />
                }
                { nextContent.isComplete ?
                  (
                    <Card.Body>
                      <Card.Title>Start a practice test</Card.Title>
                      <Button variant="primary" as={Link} to="/tests/new">Start practice test</Button>
                    </Card.Body>
                  ) : (
                    <Card.Body>
                      <Card.Title>{nextContent.title}</Card.Title>
                      <Button variant="primary" as={Link} to={`/course/ms-500/learn/${nextContent.slug}`}>Start next lesson</Button>
                    </Card.Body>
                  )
                }


              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className='margin-top40'>Course content</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <ContentsRead completedContent={userAcct.completedContent} />
            </Col>
          </Row>
          <Row>
            <Col xs={10}>
              <h2 className='margin-top40'>Practice Tests</h2>
            </Col>
            <Col xs={2} className='text-end'>
              <Button as={Link} to="/tests/new" className='margin-top40'>Start New</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <MyTests />
            </Col>
          </Row>
        </Container>
      </main>
    </Page>
  )
}
