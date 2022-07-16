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
  buildReadMeFile()
}

const buildReadMeFile = async (questions, lessons) => {
  if (!questions) {
    questions = []

    const querySnapshot = await db.collection("Tests").doc("MS-500").collection('Questions').get()
    const file = fs.readFileSync('./src/pages/course/ms-500/question/index.js', 'utf8')

    querySnapshot.forEach((doc) => {
      const question = doc.data()
      question.id = doc.id
      questions.push(question)
    })
  }

  const questionsString = questions.reduce((stringOutput, doc) => {
    // [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
    let output = convertFromRaw(doc.question).getPlainText().replace(/\r?\n|\r/g, ' ').replace(/\s\s+/g, ' ')
    output = `* [${output.trim()}](https:\/\/www.gitbit.org\/course\/ms-500\/question\/${doc.id}\)\n`
    return stringOutput + output
  }, '')

  if (!lessons) {
    lessons = []
    const querySnapshot = await db.collection("courses").doc('MS-500').collection('contents').where('type', '==', 'article').where('publish', '==', true).get()

    querySnapshot.forEach((doc) => {
      const lesson = doc.data()
      lessons.push(lesson)
    })

    const course = (await db.collection("courses").doc('MS-500').get()).data()
    lessons = lessons.sort((a, b) => course.contentOrder.indexOf(a.id) - course.contentOrder.indexOf(b.id))
  }

  const lessonsString = lessons.reduce((stringOutput, lesson) => {
    // [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
    let output = `* [${lesson.title.trim()}](https:\/\/www.gitbit.org\/course\/ms-500\/learn\/${lesson.slug}\)\n`
    return stringOutput + output
  }, '')

  console.log(lessonsString)
  const file = fs.readFileSync('./README-original.md', 'utf8')
    .replace('INSERT_QUESTIONS_HERE', questionsString)
    .replace('INSERT_LESSONS_HERE', lessonsString)

  fs.writeFileSync('./README.md', file)
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
