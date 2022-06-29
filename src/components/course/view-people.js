import * as React from "react"
import Col from 'react-bootstrap/Col'
import {getAllDocs} from '../../components/firebase'

class ViewPeople extends React.Component {
  constructor(props) {
    super(props)
    this.setPeople = this.setPeople.bind(this)

    this.state ={
      students: [],
      teachers: [],
    }
  }
 
  setPeople(people) {
    const students = people.filter(person => person.role === 'student')
    const teachers = people.filter(person => person.role === 'admin')

    this.setState({
      students,
      teachers
    })
  }

  componentDidMount() {
    getAllDocs(`courses/${this.props.courseId}/users`).then(this.setPeople)
  }

  render() {
    return (
      <div>
        <h1>Teachers</h1>
        { this.state.teachers.map((teacher, idx) => (
          <Col key={idx}>
            <p>{teacher.id}</p>
          </Col>
        ))}
        <h1>Students</h1>
        { this.state.students.map((student, idx) => (
          <Col key={idx}>
            <p>{student.id}</p>
          </Col>
        ))}
      </div>
    )
  }
}

export default ViewPeople
