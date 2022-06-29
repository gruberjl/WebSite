// const fs = require('fs')
const request = require('request')
const sharp = require('sharp')
const {articles} = require('./src/components/blog-articles')

const download = (uri, filename) => new Promise(resolve => {
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    // request(uri).pipe(fs.createWriteStream(filename)).on('close', resolve);
    request(uri).pipe(sharp).on('close', resolve);

  })
})

const downloadImages = async () => {
  console.log(articles[0])
  await download(articles[0].image, `./src/images/blog/${articles[0].gitbitURL}.png`)
}

downloadImages()
 
