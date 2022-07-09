import * as React from "react"
import Page from '../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {getDoc, saveDoc} from '../../components/firebase'
import Toasts from '../../components/toasts'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import debounce from 'debounce'

const featuredImageStyle = {
  padding: '3px'
}

const inlineStyle = {
  display: 'inline-block',
  height: '64px',
  marginLeft: '12px',
  marginRight: '12px',
  border: '1px solid transparent'
}

const featuredImageSelectedStyle = {
  display: 'inline-block',
  height: '64px',
  marginLeft: '12px',
  marginRight: '12px',
  border: '1px solid #666'
}

class EditContentPage extends React.Component {
  constructor(props) {
    super(props)
    this.setCourse = this.setCourse.bind(this)
    this.setContent = this.setContent.bind(this)
    this.setEditorState = this.setEditorState.bind(this)
    this.save = this.save.bind(this)
    this.setTitle = this.setTitle.bind(this)
    this.setDescription = this.setDescription.bind(this)
    this.selectFeaturedImage = this.selectFeaturedImage.bind(this)
    this.handlePublishChange = this.handlePublishChange.bind(this)
    this.setSlug = this.setSlug.bind(this)

    const params = new URLSearchParams(props.location.search)

    this.state = {
      course: {},
      content: {
        id: params.get('contentId'),
        type: 'article',
        article: EditorState.createEmpty(),
        title: '',
        images: [],
        description: '',
        featuredImage: '',
        publish: false,
        slug: ''
      },
      courseId: params.get('courseId'),
      editorState: EditorState.createEmpty(),
      alert: ''
    }

    this.debounceSave = debounce(this.save, 5000)
  }

  componentDidMount() {
    getDoc('courses', this.state.courseId).then(this.setCourse)
    getDoc(`courses/${this.state.courseId}/contents`, this.state.content.id).then(this.setContent)
  }

  setCourse(course) {
    this.setState({
      course
    })
  }

  setContent(content) {
    if (!content.publish) {
      content.publish = false
    }
    this.setState({
      content,
      editorState: EditorState.createWithContent(convertFromRaw(content.article))
    })
  }

  setEditorState(editorState) {
    this.setState({
      editorState,
    })

    this.debounceSave()
  }

  save() {
    const data = JSON.parse(JSON.stringify(this.state.content))
    data.article = JSON.parse(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())))
    // data.slug = encodeURI(data.title.split(' ').join('-') + '-' + data.id)

    saveDoc(`courses/${this.state.course.id}/contents`, data)
    this.setState({
      alert: 'Content saved'
    })

    setTimeout(() => { this.setState({alert: ''}) }, 3000)
  }

  setSlug(e) {
    const content = this.state.content
    let slug = e.target.value.split(' ').join('-')
    slug = slug.replace('-' + this.state.content.id, '')
    slug = encodeURI(slug).replace(/[^\w-]+/g, '') + '-' + this.state.content.id
    // content.slug = encodeURI(e.target.value.split(' ').join('-') + '-' + this.state.content.id).replace(/[^\w-]+/g, '')
    content.slug = slug
    this.setState({content})
  }

  setTitle(e) {
    const content = this.state.content
    content.title = e.target.value
    this.setState({content})
  }

  setDescription(e) {
    const content = this.state.content
    content.description = e.target.value
    this.setState({content})
  }

  selectFeaturedImage(image) {
    return () => {
      const content = this.state.content
      content.featuredImage = image
      this.setState({content})
    }
  }

  handlePublishChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const content = this.state.content
    content.publish = value
    if (content.publish) {
      const dateObj = new Date();
      const month = dateObj.getUTCMonth() + 1; //months from 1-12
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();

      content.datePublished = year + "/" + month + "/" + day
    }

    this.setState({content})
  }

  render() {
    const uploadImageCallBack = async (file) => {
      const formData = new FormData();
      formData.append('image', file)
      try {
        const response = await fetch('https://api.imgbb.com/1/upload?key=9cfb93e196063ad9f35c823c94231095', {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        })
        const json = await response.json()

        const content = JSON.parse(JSON.stringify(this.state.content))
        content.images.push(json.data.url)

        this.setState({content})
        return { data: { link: json.data.url}}
      } catch(uploadError) {
        this.setState({alert: uploadError})
      }
    }

    return (
      <Page title={'Edit Content'}>
        <main>
          <Container>
            <Row>
              <Form>
                <Form.Group controlId="formBasicTitle">
                  <Row>
                    <Col className="margin12">
                      <Form.Control type="text" placeholder="Title" size="lg" value={this.state.content.title} onChange={this.setTitle}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="margin12">
                      <Form.Control type="text" placeholder="Slug" value={this.state.content.slug} onChange={this.setSlug}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="margin12">
                      <Form.Control as="textarea" placeholder="Description" value={this.state.content.description} onChange={this.setDescription}/>
                    </Col>
                  </Row>
                  <div>
                    <Row>
                      <Col className="margin12">
                        <h2>Select Featured Image</h2>
                      </Col>
                    </Row>
                    { this.state.content.images.map((image, idx) => (
                      <div role="button" tabIndex="-1" key={idx} style={this.state.content.featuredImage === image ? featuredImageSelectedStyle : inlineStyle} onClick={this.selectFeaturedImage(image)} onKeyDown={this.selectFeaturedImage(image)}>
                        <img src={image} height="64px" alt="" style={featuredImageStyle} />
                      </div>
                    )) }

                  </div>
                  <Row className='margin12'>
                    <Col>
                      { Editor ?
                        <Editor editorState={this.state.editorState} onEditorStateChange={this.setEditorState} toolbar={{
                          inline: { inDropdown: true },
                          list: { inDropdown: true },
                          textAlign: { inDropdown: true },
                          link: { inDropdown: true },
                          history: { inDropdown: true },
                          image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                        }}/>
                        : <div/>
                      }
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Check label="Publish?" name="publish" id="Publish" onChange={this.handlePublishChange} checked={this.state.content.publish} />
                    </Col>
                    <Col>
                      <Button onClick={this.save}>Save</Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Row>
          </Container>
        </main>
        <Toasts text={this.state.alert} />
      </Page>
    )
  }
}

export default EditContentPage
