const path = require('path')
const fs = require('fs')
const glob = require("glob")
const xml2js = require("xml2js")
const util = require('util')
const parseString = util.promisify(require("xml2js").parseString)
const copyDir = require('copy-dir')
const cheerio = require('cheerio')
const sizeOf = require('image-size')
const url = require('url')
const http = require('http')
const https = require('https')

const docsPath = path.join(__dirname, 'docs')

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-draft-wysiwyg/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.onPostBuild =  async () => {
  const publicPath = path.join(__dirname, 'public')

  await new Promise(r => setTimeout(r, 5000))

  if (fs.existsSync(docsPath))
    fs.rmSync(docsPath, { recursive: true })

  copyDir.sync(publicPath, docsPath)
  fs.copyFileSync(path.join(docsPath, 'sitemap', 'sitemap-index.xml'), path.join(docsPath, 'sitemap.xml'))
  moveIndexFiles()
  cleanEmptyFolders()
  await buildSitemap()
  await addOgImageDimensions()
}

const moveIndexFiles = () => {
  const indexFiles = glob.sync(path.resolve(docsPath, '**/index.html*').replace(/\\/g, '/'))

  for (let i = 0; i < indexFiles.length; i++) {
    const filePath = indexFiles[i]
    if (!filePath.endsWith('docs/index.html') && !filePath.endsWith('docs/index.html.gz'))
      fs.renameSync(filePath, filePath.replace('/index.html', '.html'))
  }
}

const cleanEmptyFolders = (folder) => {
  const docsPath = path.join(__dirname, 'docs')
  const folders = glob.sync(path.resolve(docsPath, '**').replace(/\\/g, '/')).filter(doc => fs.statSync(doc).isDirectory())

  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i]
    const files = fs.readdirSync(folder)

    if (files.length == 0) {
      fs.rmdirSync(folder)
    }
  }
}

const buildSitemap = async () => {
  const sitemap = fs.readFileSync('./docs/sitemap/sitemap-0.xml')
  const jsSitemap = await parseString(sitemap)

  jsSitemap.urlset.url = jsSitemap.urlset.url.map(url => {
    if (url.loc[0].endsWith('/') && url.loc[0].toLowerCase() !== 'https://www.gitbit.org/') {
      console.log(url.loc[0])
      url.loc[0] = url.loc[0].slice(0, -1)
    }

    return url
  })

  const builder = new xml2js.Builder();
  const xml = builder.buildObject(jsSitemap);

  fs.writeFileSync('./docs/sitemap/sitemap-0.xml', xml)
}

const addOgImageDimensions = async () => {
  const startStr = 'property="og:image" itemProp="image primaryImageOfPage" content="'
  const endStr = '"/>'
  const htmlFiles = glob.sync(path.resolve(docsPath, '**/*.html').replace(/\\/g, '/'))
    .filter(file => !file.endsWith('/404.html'))
    .filter(file => !file.endsWith('offline-plugin-app-shell-fallback.html'))

  for (let i = 0; i < htmlFiles.length; i++) {
    const filePath = htmlFiles[i]
    const html = fs.readFileSync(filePath, 'utf8')
    const startPos = html.indexOf(startStr)
    if (startPos === -1)
      throw `Unable to find start position in file: ${filePath}`

    const start = startPos+startStr.length

    const end = html.indexOf(endStr, start)
    if (end === -1)
      throw `Unable to find end position in file: ${filePath}`
    // console.log(filePath)
    // console.log(html.substring(start, end))
    let imagePath = html.substring(start, end)
      .replace('https://www.gitbit.org/', '')

    let dimensions
    if (imagePath.startsWith('http')) {
      dimensions = downloadImage(imagePath)
    } else {
      imagePath = `./docs/${imagePath}`
      dimensions = sizeOf(imagePath)
    }

    const output =
      `${html.slice(0, end+endStr.length)}<meta property="og:image:width" name="og:image:width" content="${dimensions.width}" /><meta property="og:image:height" name="og:image:height" content="${dimensions.height}" />${html.slice(end+endStr.length)}`

    fs.writeFileSync(filePath, output)
  }
}

const downloadImage = (imgUrl) => new Promise((res, rej) => {
  const options = url.parse(imgUrl)
  const getter = imgUrl.startsWith('https') ? https : http
  getter.get(options, function (response) {
    const chunks = []
    response.on('data', function (chunk) {
      chunks.push(chunk)
    }).on('end', function() {
      const buffer = Buffer.concat(chunks)
      res(sizeOf(buffer))
    })
  })
})
