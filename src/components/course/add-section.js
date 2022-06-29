import * as React from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {IoAdd} from 'react-icons/io5'

const AddSection = ({addSection, hidden, allowDrop, onDrop, idx}) => {
  return (
    <Row className="section-divider" onDrop={onDrop} onDragOver={allowDrop} data-section-idx={idx}>
      <Col className={'align-center' + (hidden ? ' hidden' : '')} data-section-idx={idx}>
        <hr data-section-idx={idx}/>
        <button className="inline-flex-align-center link" onClick={addSection} data-section-idx={idx}><IoAdd data-section-idx={idx} /> Add Section</button>
      </Col>
    </Row>
  )
} 

export default AddSection
