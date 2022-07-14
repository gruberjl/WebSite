const fs = require('fs')
const admin = require("firebase-admin")
const serviceAccount = require("./firestore.json")
const draftToHtml = require('draftjs-to-html')
const { convertFromRaw } = require('draft-js')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://web-server-9d634.firebaseio.com"
})

const db = admin.firestore()

const run = async () => {
  require('./build-feeds')
  const questions = []

  const querySnapshot = await db.collection("Tests").doc("MS-500").collection('Questions').get()
  const file = fs.readFileSync('./src/pages/course/ms-500/question/index.js', 'utf8')

  querySnapshot.forEach((doc) => {
    const question = doc.data()
    question.id = doc.id
    questions.push(question)
  })

  const question = questions[0]
  questions.forEach(question => {
    let newFile = file.replace('-uSPBkNRR', question.id)
    newFile = newFile.replace('QUESTION_ID', question.id)
    const questionHtml = draftToHtml(question.question)
    const referencesHtml = draftToHtml(question.references).replace(/\\/g, '\\\\')
    newFile = newFile.replace('This is my question', questionHtml)
    newFile = newFile.replace('This is my references', referencesHtml)

    const question2 = Object.keys(question).sort().reduce(
      (obj, key) => {
        obj[key] = question[key];
        return obj;
      },
      {}
    )
    newFile = newFile.replace('{question:true}', JSON.stringify(question2))
    newFile = newFile.replace('question text placeholder', convertFromRaw(question.question).getPlainText().replace(/\r?\n|\r/g, ' ').replace(/\s\s+/g, ' '))
    fs.writeFileSync(`./src/pages/course/ms-500/question/${question.id}.js`, newFile)
  })

  buildBrowseQuestions(questions)
}

const buildBrowseQuestions = async (questions) => {
  const newDocs = questions.map(doc => {
    doc.question = convertFromRaw(doc.question).getPlainText().replace(/\r?\n|\r/g, ' ').replace(/\s\s+/g, ' ')
    return doc
  })

  const str = JSON.stringify(newDocs)

  const file = fs.readFileSync('./src/pages/course/ms-500/browse-questions.txt', 'utf8')
  const newFile = file.replace('"DOCS GO HERE"', str)
  fs.writeFileSync('./src/pages/course/ms-500/browse-questions.js', newFile)
}

run()
