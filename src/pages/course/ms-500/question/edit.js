import * as React from "react"
import shortid from 'shortid'
import { convertToRaw, convertFromRaw } from 'draft-js'
import { navigate } from "gatsby"
import Page from '../../../../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {getDoc, saveDoc, deleteDoc} from '../../../../components/firebase'

const optionStyles = {
  marginTop: '14px',
  marginBottom: '14px',
  display: 'flex'
}
 
const checkboxStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const deleteAnswerStyle = {
  marginLeft: '14px'
}

const referencesStyle = {
  marginTop: '24px'
}

class EditQuestionPage extends React.Component {
  constructor(props) {
    super(props)
    this.getData = this.getData.bind(this)
    this.setEditorState = this.setEditorState.bind(this)
    this.setReferencesEditorState = this.setReferencesEditorState.bind(this)
    this.setAnswersState = this.setAnswersState.bind(this)

    const params = new URLSearchParams(props.location.search)

    this.state = {
      uploadError: '',
      id: params.has('docid') ? params.get('docid') : shortid.generate(),
      editorState: EditorState.createEmpty(),
      referencesEditorState: EditorState.createEmpty(),
      answersState: [
        {
          isCorrectAnswer: false,
          value: ''
        },
        {
          isCorrectAnswer: false,
          value: ''
        },
        {
          isCorrectAnswer: false,
          value: ''
        }
      ],
      hasBeenSaved: params.has('docid') ? true : false,
      doc: {}
    }

    if (params.has('docid')) {
      this.getData(params.get('docid'))
    }
  }

  getData(docId) {
    getDoc('Tests/MS-500/Questions', docId).then(doc => this.setState({
      doc,
      editorState:EditorState.createWithContent(convertFromRaw(doc.question)),
      referencesEditorState:EditorState.createWithContent(convertFromRaw(doc.references)),
      answersState:doc.answers
    }))
  }

  setEditorState(editorState) {
    this.setState({
      editorState,
    });
  }

  setReferencesEditorState(referencesEditorState) {
    this.setState({
      referencesEditorState
    })
  }

  setAnswersState(answersState) {
    this.setState({
      answersState,
    })
  }

  render() {
    const {editorState, answersState, uploadError, referencesEditorState} = this.state

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

        return { data: { link: json.data.url}}
      } catch(uploadError) {
        this.setState({uploadError})
      }
    }

    const handleCorrectAnswerChange = (event) => {
      const idx = event.target.dataset.index
      const target = event.target;
      let items = [...answersState];
      let item = {...items[idx]};
      item.isCorrectAnswer = target.type === 'checkbox' ? target.checked : target.value
      items[idx] = item;
      this.setAnswersState(items);
    }

    const handleAnswerChange = (event) => {
      const idx = event.target.dataset.index
      const target = event.target;
      let items = [...answersState];
      let item = {...items[idx]};
      item.value = target.type === 'checkbox' ? target.checked : target.value
      items[idx] = item;
      this.setAnswersState(items);
    }

    const addAnswer = () => {
      let items = [...answersState]
      items.push({
        isCorrectAnswer: false,
        value: ''
      })
      this.setAnswersState(items)
    }

    const deleteAnswer = (event) => {
      const idx = event.target.dataset.index
      let items = [...answersState]
      items.splice(idx, 1)
      this.setAnswersState(items)
    }

    const save = () => {
      const data = {
        answers: this.state.answersState,
        question: convertToRaw(this.state.editorState.getCurrentContent()),
        references: convertToRaw(this.state.referencesEditorState.getCurrentContent()),
        id: this.state.id
      }

      saveDoc('Tests/MS-500/Questions', data)
      this.setState({
        hasBeenSaved: true
      })
    }

    const deleteQuestion = () => {
      if(window.confirm('Are you sure you want to delete the question?')) {
        deleteDoc(`Tests/MS-500/Questions`, this.state.id).then(() => {
            navigate("/course/ms-500/edit/")
        }).catch((error) => {
            console.error("Error removing document: ", error);
        })
      }
    }

    return (
      <Page title={'Microsoft 365 MS-500 practice test question edit'} description={'Edit the MS-500 Practice test questions'}>
        <main>
          <div>
            <Container>
              <Row>
                <Col xs={6}><h1>Question</h1></Col>
                <Col xs={6} className='text-end'>
                  { this.state.hasBeenSaved ?
                      <Button variant="outline-danger" style={{marginRight: '12px'}} onClick={deleteQuestion}>Delete</Button> :
                      ''
                  }

                  <Button onClick={save}>Save</Button>
                </Col>
              </Row>
              <Row>
                <Alert variant={'danger'} className={uploadError === '' ? 'display-none' : ''}>
                  <h5>Error Uploading file to Imgur</h5>
                  <p>{uploadError}</p>
                </Alert>
              </Row>
              <Row>
                <Col>
                  {typeof window !== 'undefined' && Editor && (
                    <Editor editorState={editorState} onEditorStateChange={this.setEditorState} toolbar={{
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                      image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                    }}/>
                  )}
                </Col>
              </Row>
              {answersState.map((answerState, index) => {
                return (
                  <div style={optionStyles} key={index}>
                    <Form.Check type="checkbox" name={"AnswerCheck" + index} data-index={index} inline style={checkboxStyles} checked={answerState.isCorrectAnswer} onChange={handleCorrectAnswerChange} />
                    <Form.Control type="text" name={"Answer" + index} data-index={index} placeholder="Enter answer option here" value={answerState.value} onChange={handleAnswerChange} />
                    <Button onClick={deleteAnswer} name={"deleteAnswer" + index} data-index={index} style={deleteAnswerStyle} variant="outline-danger">Delete</Button>
                  </div>
                )
              })}
              <Button onClick={addAnswer}>Add</Button>
              <div>
                <h2 style={referencesStyle}>References</h2>
                {typeof window !== 'undefined' && Editor && (
                  <Editor editorState={referencesEditorState} onEditorStateChange={this.setReferencesEditorState} toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                  }}/>
                )}
              </div>
            </Container>
          </div>
        </main>
      </Page>
    )
  }
}

export default EditQuestionPage
