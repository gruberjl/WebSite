import * as React from "react"
import Accordion from 'react-bootstrap/Accordion'
import {IoDocumentText} from 'react-icons/io5'
import { Link } from "gatsby"
import Form from 'react-bootstrap/Form'
import {onAuthStateChanged, getDoc} from './firebase'
import {course, contents} from '../data'

const marginRight = {
  marginRight: '12px'
}

const isBrowser = () => typeof window !== 'undefined'

const ContentBox = ({content, completedContent}) => {
  if (completedContent.includes(content.id)) {
    return (<Form.Check label={content.title} checked={true} onChange={() => {}}  className="color-green"/>)
  } else {
    return (<span><IoDocumentText style={marginRight} /><span>{content.title}</span></span>)
  }
}

const ContentsRead = ({completedContent}) => {
  const [uid, setUid] = React.useState('')
  const [userAcct, setUserAcct] = React.useState({completedContent: completedContent || []})
 
  React.useEffect(() => {
    if (isBrowser()) {
      const onAuthStateChangedListener = onAuthStateChanged(user => {
        if (user) {
          setUid(user.uid)
          if (!completedContent) {
            console.log('getting content')
            getDoc('courses/MS-500/users', user.uid).then((userAcct) => {
              if (!userAcct.completedContent) {
                userAcct.completedContent = []
              }
              setUserAcct(userAcct)
            })
          }
        } else
          setUid('')
      })

      return () => onAuthStateChangedListener()
    }
  }, [])

  return (
    <div>
      <Accordion defaultActiveKey="0">
        {course.sections.map((section, idx) => (
          <Accordion.Item eventKey={idx} key={idx}>
            <Accordion.Header>{section.title}</Accordion.Header>
            <Accordion.Body>
              { contents.filter(content => content.sectionId === section.id).map((content, contentIdx) => (
                <div key={contentIdx} className='margin12'>
                  <Link to={`/course/ms-500/learn/${content.slug}`}>
                    <ContentBox content={content} completedContent={completedContent || userAcct.completedContent} />
                  </Link>
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

export default ContentsRead
