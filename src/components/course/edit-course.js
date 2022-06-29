import * as React from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import {getDoc, saveDoc} from '../../components/firebase'

const formStyles = {
  marginBottom: '16px',
}

const emailStyles = {
  marginBottom: '12px'
}
 
class EditCourseTab extends React.Component {
  constructor(props) {
    super(props)
    this.setCourse = this.setCourse.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.submit = this.submit.bind(this)

    this.state ={
      title: '',
      description: '',
      audience: '',
      err: '',
      courseId: props.courseId,
      success: false
    }
  }

  setCourse(course) {
    this.setState({
      title: course.title,
      description: course.description,
      audience: course.audience
    })
  }

  handleFieldChange(event) {
    const value = event.target.value;
    const name = event.target.name
    this.setState({
      [name]:value
    })
  }

  submit() {
    const data = {
      title: this.state.title,
      description: this.state.description,
      audience: this.state.audience,
      id: this.state.courseId
    }

    saveDoc('courses', data).then(() => {
      this.setState({success: true})
    }).catch(err => {
      this.setState({err})
    })
  }

  componentDidMount() {
    getDoc('courses', this.state.courseId).then(this.setCourse)
  }


  render() {
    return (
      <div>
        <h1>Edit Course</h1>
        <Form>
          <Form.Group controlId="formBasicTitle" style={emailStyles}>
            <Form.Label>Course title</Form.Label>
            <Form.Control name='title' type="text" placeholder="Title" value={this.state.title} onChange={this.handleFieldChange} />
          </Form.Group>

          <Form.Group controlId="formBasicDescription" style={formStyles}>
            <Form.Label>Describe the course</Form.Label>
            <Form.Control name='description' type="text" placeholder="Description" value={this.state.description} onChange={this.handleFieldChange} />
          </Form.Group>

          <Form.Group controlId="formBasicAudience" style={formStyles}>
            <Form.Label>Who's the course for?</Form.Label>
            <Form.Control name='audience' type="text" placeholder="Audience" value={this.state.audience} onChange={this.handleFieldChange} />
          </Form.Group>

          <Alert variant='danger' className={this.state.err === '' ? 'd-none' : ''}>
            {this.state.err}
          </Alert>

          <Alert variant='success' className={this.state.success === false ? 'd-none' : ''}>
            Saved successully
          </Alert>

          <Button variant="primary" type="button" onClick={this.submit}>
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default EditCourseTab
