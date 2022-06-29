import React from "react"
import { useState } from 'react'
import Toast from 'react-bootstrap/Toast'

const Toasts = ({text}) => {
  const [show, setShow] = useState(false)

  React.useEffect(() => {
    if (text !== '')
      setShow(true)
  }, [text])

  return (
    <div className='toast-holder'>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Body>{text}</Toast.Body>
      </Toast>
    </div>
  )
}

export default Toasts
 
