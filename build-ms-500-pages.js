const fs = require('fs')
const admin = require("firebase-admin")
const serviceAccount = require("./firestore.json")
const draftToHtml = require('draftjs-to-html')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://web-server-9d634.firebaseio.com"
})

const db = admin.firestore()

const run = async () => {
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
    const questionHtml = draftToHtml(question.question)
    const referencesHtml = draftToHtml(question.references)
    newFile = newFile.replace('This is my question', questionHtml)
    newFile = newFile.replace('This is my references', referencesHtml)
    newFile = newFile.replace('{question:true}', JSON.stringify(question))
    fs.writeFileSync(`./src/pages/course/ms-500/question/${question.id}.js`, newFile)
  })
}

run()
