import React from "react"
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import {IoTrashOutline, IoAdd} from 'react-icons/io5'
import {GrDrag} from 'react-icons/gr'
import shortid from 'shortid'
import { EditorState } from 'draft-js'
import { convertToRaw } from 'draft-js'
import { Link } from "gatsby"
import {MdPublic} from 'react-icons/md'

const flexStyle = {
  display: 'flex'
}
 
const marginRight16 = {
  marginRight: '16px'
}

const marginLeft16 = {
  marginLeft: '16px'
}

const svgStyle = {
  height: '38px',
  fontSize: '20px',
  marginRight: '16px',
  cursor: 'move'
}

const resort = (arr) => {
  return arr.sort((firstEl, secondEl) => {
    if (firstEl.order < secondEl.order)
      return -1
    if (firstEl.order > secondEl.order)
      return 1

    return 0
  })
}

const EditSection = ({section, updateSection, removeSection, allowDrop, onDrop, idx, courseId, contents, addContent, removeContent}) => {
  const dragStartSection = (section) => {return (ev) => {
    ev.dataTransfer.setData("sectionId", section.id)
    ev.dataTransfer.setData("type", 'section')
  }}

  const dragStartContent = (section, content) => {return (ev) => {
    ev.dataTransfer.setData("sectionId", section.id)
    ev.dataTransfer.setData("contentId", content.id)
    ev.dataTransfer.setData("type", 'content')
  }}

  const sectionContents = resort(contents.filter(content => content.sectionId === section.id))

  const createContent = () => {
    const content = {
      id: shortid.generate().split('-').join('1'),
      title: '',
      sectionId: section.id,
      type: 'article',
      article: convertToRaw(EditorState.createEmpty().getCurrentContent()),
      images: [],
      description: '',
      featuredImage: ''
    }

    if (sectionContents.length > 0) {
      addContent(content, sectionContents[sectionContents.length-1].id)
    } else {
      addContent(content)
    }

  }

  return (
    <Card onDragOver={allowDrop} onDrop={onDrop} data-section-idx={idx}>
      <Card.Header data-section-idx={idx} draggable="true" onDragStart={dragStartSection(section)} >
        <Form data-section-idx={idx}>
          <Form.Group controlId="formBasicTitle" style={flexStyle} data-section-idx={idx}>
            <GrDrag style={svgStyle} data-section-idx={idx} />
            <Form.Control type="text" placeholder="Section Title" value={section.title} name='section-title' onChange={updateSection} style={marginRight16} data-section-idx={idx} />
            <Button onClick={removeSection(section)} data-section-idx={idx}><IoTrashOutline data-section-idx={idx}/></Button>
          </Form.Group>
        </Form>
      </Card.Header>
      <ListGroup data-section-idx={idx}>
        { sectionContents.map((content, index) => (
          <ListGroup.Item draggable="true" onDragStart={dragStartContent(section, content)} key={index} data-section-idx={idx} data-content-id={content.id} className='flex-space-between'>
            <div data-section-idx={idx} data-content-id={content.id}>
              <GrDrag style={svgStyle} data-section-idx={idx} data-content-id={content.id} />
              <Link to={`/course/edit-content?courseId=${courseId}&contentId=${content.id}`} data-section-idx={idx} data-content-id={content.id} className='link'>{content.title || 'New Content'}</Link>
              <span style={marginLeft16}>{content.publish ? <MdPublic title="published"/> : ''}</span>
            </div>
            <Button variant="link" onClick={removeContent(content.id)} data-section-idx={idx} data-content-id={content.id} className='hidden'><IoTrashOutline data-section-idx={idx} data-content-id={content.id} /></Button>
          </ListGroup.Item>
        ))}
        <ListGroup.Item data-section-idx={idx}><button onClick={createContent} className='link' data-section-idx={idx}><IoAdd data-section-idx={idx} /> Add Article</button></ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default EditSection
