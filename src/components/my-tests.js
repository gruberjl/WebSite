import React from "react"
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link, navigate } from "gatsby"
import {onAuthStateChanged, getAllDocs, deleteDoc} from './firebase'

const isBrowser = () => typeof window !== 'undefined'

export default function MyTests() {
  const [uid, setUid] = React.useState('')
  const [tests, setTests] = React.useState([])

  React.useEffect(() => {
    if (isBrowser()) {
      const onAuthStateChangedListener = onAuthStateChanged(user => {
        if (user) {
          setUid(user.uid)
          getAllDocs(`users/${user.uid}/tests`).then(setTests)
        } else {
          navigate('/login')
        }
      })

      return () => onAuthStateChangedListener()
    }
  }, [])
 
  const deleteTest = (event) => {
    const id = event.target.dataset.id
    deleteDoc(`users/${uid}/tests`, id).then(() => {
      const newTests = tests.filter(test => {
        return test.id !== id;
      })

      setTests(newTests)
    }).catch((error) => {
        console.error("Error removing document: ", error);
    })
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Course</th>
          <th>Number of Questions</th>
          <th>Is Complete</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {tests.map((doc, idx) => (
          <tr key={idx}>
            <td><Button variant="link" as={Link} to={`/course/ms-500/test/?testid=${doc.id}`}>MS-500</Button></td>
            <td>{Object.keys(doc.questions).length}</td>
            <td>{doc.isComplete ? 'Complete' : 'Incomplete'}</td>
            <td><Button onClick={deleteTest} data-id={doc.id}>Delete</Button></td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
