const fs = require('fs')
const admin = require("firebase-admin")
const draftToHtml = require('draftjs-to-html')
const serviceAccount = require("./firestore.json")
const { convertFromRaw } = require('draft-js')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://web-server-9d634.firebaseio.com"
})

const db = admin.firestore()

const run = async () => {
  const articles = []

  const querySnapshot = await db.collection("courses").doc('MS-500').collection('contents').where('type', '==', 'article').where('publish', '==', true).get()

  querySnapshot.forEach((doc) => {
    const article = doc.data()
    articles.push(article)
  })

  // Test the articles to verify all content is there
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i]
    if (article.title === '' || article.title === null) {
      article.error = `Title is blank in ${article.id}`
      console.error(article.error)
    }

    if (article.description === '' || article.description === null) {
      article.error = `Description is blank in ${article.title}`
      console.error(article.error)
    }

    if (article.featuredImage === '' || article.featuredImage === null) {
      article.error = `featuredImage is blank in ${article.title}`
      console.error(article.error)
    }

    if (article.publish === '' || article.publish === null || article.publish === false) {
      article.error = `${article.title} is not published`
      console.error(article.error)
    } else {
      if (!article.datePublished) {
        const dateObj = new Date();
        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();

        article.datePublished = year + "/" + month + "/" + day
        console.log(`Setting datePublished for ${article.title}`)
        const res = await db.collection("courses").doc('MS-500').collection('contents').doc(article.id).set(article)
      }
    }

    const expectedSlug = encodeURI(article.slug).replace(/[^\w-]+/g, '').replace('-' + article.id, '') + '-' + article.id
    if (article.slug === '' || article.slug === null || article.slug !== expectedSlug) {
      article.error = `slug is blank or wrong in ${article.title}. Received: ${article.slug}. expected: ${encodeURI(article.slug).replace(/[^\w-]+/g, '') + '-' + article.id}`
      console.error(article.error)
    }
  }

  // Write the articles to files
  const file = fs.readFileSync('./src/pages/course/ms-500/learn/article.js', 'utf8').toString()
  const course = (await db.collection("courses").doc('MS-500').get()).data()
  const sortedArticles = articles.sort((a, b) => course.contentOrder.indexOf(a.id) - course.contentOrder.indexOf(b.id))
  const cleanedArticles = sortedArticles.map(article => {
    return {
      id: article.id,
      sectionId: article.sectionId,
      slug: article.slug,
      title: article.title,
      featuredImage: article.featuredImage
    }
  })

  for (let i = 0; i < sortedArticles.length; i++) {
    const article = sortedArticles[i]

    if (!article.error) {
      let newFile = file.replace('{COURSE:true, sections:[]}', JSON.stringify(course))
      newFile = newFile.replace('{ARTICLE:true}', JSON.stringify(article))
      newFile = newFile.replace("['ARTICLES']", JSON.stringify(cleanedArticles))
      newFile = newFile.replace('<ARTICLE/>', draftToHtml(article.article).replace(/`/g, "\`").replace(/\\/g, '\\\\'))
      if (sortedArticles.length - 1 > i)
        newFile = newFile.replace('NEXT_CONTENT', sortedArticles[i + 1].slug)
 const str = `sad\`fg`
      if (i > 0)
        newFile = newFile.replace('PREVIOUS_CONTENT', sortedArticles[i - 1].slug)

      fs.writeFileSync(`./src/pages/course/ms-500/learn/${article.slug}.js`, newFile)
    }
  }

  let dataTemplate = fs.readFileSync('./src/data/template.js', 'utf8').toString()
  contentsRead = dataTemplate.replace('0', JSON.stringify(course))
  fs.writeFileSync('./src/data/course.js', contentsRead)

  contentsRead = dataTemplate.replace('0', JSON.stringify(cleanedArticles))
  fs.writeFileSync('./src/data/contents.js', contentsRead)

  const questions = await getQuestions()
  contentsRead = dataTemplate.replace('0', JSON.stringify(questions))
  fs.writeFileSync('./src/data/questions.js', contentsRead)
}

const getQuestions = async () => {
  const questions = []
  const querySnapshot = await db.collection("Tests").doc('MS-500').collection('Questions').get()

  querySnapshot.forEach((doc) => {
    const question = doc.data()
    question.question = convertFromRaw(question.question).getPlainText()
    questions.push(question)
  })
  
  return questions
}

run()
