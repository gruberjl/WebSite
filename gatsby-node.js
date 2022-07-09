const path = require('path');
const fs = require('fs');
const glob = require("glob")

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

  fs.rmdirSync(docsPath, { recursive: true })
  fs.renameSync(publicPath, docsPath)
  fs.mkdirSync(publicPath)
  fs.copyFileSync(path.join(docsPath, 'sitemap', 'sitemap-index.xml'), path.join(docsPath, 'sitemap.xml'))
  moveIndexFiles()
  cleanEmptyFolders()
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
