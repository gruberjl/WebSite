const path = require('path');
const fs = require('fs');

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

exports.onPostBuild = function() {
  const publicPath = path.join(__dirname, 'public')
  const docsPath = path.join(__dirname, 'docs')

  setTimeout(() => {
    fs.rmdirSync(docsPath, { recursive: true })
    fs.renameSync(publicPath, docsPath)
    fs.mkdirSync(publicPath)
  }, 5000)

}
 
