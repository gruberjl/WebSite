import * as React from "react"
import Page from '../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const IndexPage = () => {
  return (
    <Page>
      <main>
        <div>
          <Container>
            <Row>
              <Col>Hello World</Col>
            </Row>
          </Container>
        </div>
      </main>
    </Page>
  )
}

export default IndexPage
