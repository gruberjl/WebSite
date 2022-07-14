const path = require('path')
const fs = require('fs')
const glob = require("glob")
const xml2js = require("xml2js")
const util = require('util')
const parseString = util.promisify(require("xml2js").parseString)
const copyDir = require('copy-dir')

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
  const docsPath = path.join(__dirname, 'docs')

  await new Promise(r => setTimeout(r, 5000))

  if (fs.existsSync(docsPath))
    fs.rmSync(docsPath, { recursive: true })

  copyDir.sync(publicPath, docsPath)
  fs.copyFileSync(path.join(docsPath, 'sitemap', 'sitemap-index.xml'), path.join(docsPath, 'sitemap.xml'))
  moveIndexFiles()
  cleanEmptyFolders()
  await buildSitemap()
}

const moveIndexFiles = () => {
  const docsPath = path.join(__dirname, 'docs')
  const indexFiles = glob.sync(path.resolve(docsPath, '**/index.html*'))

  for (let i = 0; i < indexFiles.length; i++) {
    const filePath = indexFiles[i]
    if (!filePath.endsWith('docs/index.html') && !filePath.endsWith('docs/index.html.gz'))
      fs.renameSync(filePath, filePath.replace('/index.html', '.html'))
  }
}

const cleanEmptyFolders = (folder) => {
  const docsPath = path.join(__dirname, 'docs')
  const folders = glob.sync(path.resolve(docsPath, '**')).filter(doc => fs.statSync(doc).isDirectory())

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
    if (url.loc[0].endsWith = '/')
      url.loc[0] = url.loc[0].slice(0, -1)

    return url
  })

  const builder = new xml2js.Builder();
  const xml = builder.buildObject(jsSitemap);

  fs.writeFileSync('./docs/sitemap/sitemap-0.xml', xml)
}
