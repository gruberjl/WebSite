const fs = require('fs')
const url = require('url')
const http = require('https')
const sizeOf = require('image-size')
const {articles} = require('./src/components/blog-articles')

const getHeight = (imgUrl) => new Promise(resolve => {
  const options = url.parse(imgUrl)
  http.get(options, function (response) {
    const chunks = []
    response.on('data', function (chunk) {
      chunks.push(chunk)
    }).on('end', function() {
      const buffer = Buffer.concat(chunks)
      resolve(sizeOf(buffer).height)
    })
  })
})

const getImageHeight = async () => {
  for (let i = 0; i < articles.length; i++) {
    articles[i].imageHeight = await getHeight(articles[i].image)
    articles[i].image575Height = await getHeight(articles[i].image575)
    articles[i].image244Height = await getHeight(articles[i].image244)
    articles[i].image334Height = await getHeight(articles[i].image334)
    articles[i].image214Height = await getHeight(articles[i].image214)
    articles[i].image259Height = await getHeight(articles[i].image259)
    articles[i].image304Height = await getHeight(articles[i].image304)
  }

  fs.writeFileSync('./src/components/blog-articles2.js', JSON.stringify(articles, null, 2))

  console.log(articles)
}

getImageHeight()
 
