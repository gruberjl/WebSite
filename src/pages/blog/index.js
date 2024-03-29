import * as React from "react"
import Page from '../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from "gatsby"
import blogArticles from '../../components/blog-articles'
import M365CertificationImg from '../../images/microsoft365-security-administrator-associate-600x600.png'
 
class BlogArticle extends React.Component {
  constructor(props) {
    super()
    this.handleWindowResize = this.handleWindowResize.bind(this)

    const articles = blogArticles.articles.map(article => {
      article.height = article.image575Height
      return article
    })

    this.state = {
      width: 575,
      articles: articles
    }
  }

  componentDidMount() {
    this.handleWindowResize()
    window.addEventListener("resize", this.handleWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize)
  }

  handleWindowResize() {
    let newWidth = this.state.width
    let newArticles = this.state.articles


    if (window.innerWidth <= 575) {
      if (newWidth !== 575) {
        newWidth = 575
        newArticles = newArticles.map(article => {
          article.height = article.image575Height
          return article
        })
      }
    } else if (window.innerWidth >= 576 && window.innerWidth < 767) {
      if (newWidth !== 244) {
        newWidth = 244
        newArticles = newArticles.map(article => {
          article.height = article.image244Height
          return article
        })
      }
    } else if (window.innerWidth >= 767 && window.innerWidth < 991) {
      if (newWidth !== 334) {
        newWidth = 334
        newArticles = newArticles.map(article => {
          article.height = article.image334Height
          return article
        })
      }
    } else if (window.innerWidth >= 991 && window.innerWidth < 1199) {
      if (newWidth !== 214) {
        newWidth = 214
        newArticles = newArticles.map(article => {
          article.height = article.image214Height
          return article
        })
      }
    } else if (window.innerWidth >= 1199 && window.innerWidth < 1399) {
      if (newWidth !== 259) {
        newWidth = 259
        newArticles = newArticles.map(article => {
          article.height = article.image259Height
          return article
        })
      }
    } else if (window.innerWidth >= 1400) {
      if (newWidth !== 304) {
        newWidth = 304
        newArticles = newArticles.map(article => {
          article.height = article.image304Height
          return article
        })
      }
    }

    this.setState({
      width: newWidth,
      articles: newArticles
    })
  }

  render() {
    return (
      <Page title={'Advice, opinions, and guides on Microsoft 365'} description={'Advice, opinions, and guides on Microsoft 365'} jsonLdType={'WebPage'} image={M365CertificationImg}>
        <main>
          <div>
            <Container className="blog-articles">
              <Row>
                <h1>Articles on how to get the most out of Microsoft 365</h1>
                {this.state.articles.map((article, idx) => (
                  <Col key={idx} xs={12} md={6} sm={6} lg={3}>
                    <Link to={`/blog/${article.gitbitURL}`} className='no-styles'>
                      <Card style={{marginBottom:'12px'}}>
                        <Card.Img variant="top" src={article.image} width={this.state.width} height={article.height}
                          alt={article.title}
                          srcSet={`${article.image575} 575w, ${article.image244} 244w, ${article.image334} 334w, ${article.image214} 214w, ${article.image259} 259w, ${article.image304} 304w`}
                          sizes='(max-width: 575px) 575px, (max-width:767px) 244px, (max-width:991px) 334px, (max-width:1199px) 214px, (max-width:1399px) 259px, (min-width:1400px) 304px'
                        />
                        <Card.Body>
                          <Card.Title>{article.title}</Card.Title>
                          <Card.Text>{article.description}</Card.Text>
                          <Button variant="primary">Read more</Button>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </main>
      </Page>
    )
  }
}
// sizes="(max-width: 575px) 575px, (min-width:576px) and (max-width:767px) 244px, (min-width:768px) and (max-width:991px) 334px, (min-width:992px) and (max-width:1199px) 214px, (min-width:1200px) and (max-width:1399px) 259px, (min-width:1400px) 304px"
export default BlogArticle
