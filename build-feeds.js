const fs = require('fs')
const Feed = require('feed').Feed
const config = require('./gatsby-config')
const {articles} = require('./src/components/blog-articles')

const feed = new Feed({
  title: config.siteMetadata.title,
  description: config.siteMetadata.description,
  id: config.siteMetadata.siteUrl,
  link: `${config.siteMetadata.siteUrl}/blog`,
  language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: `${config.siteMetadata.siteUrl}/images/gitbit-logo-1200x675.png`,
  favicon: `${config.siteMetadata.siteUrl}/favicon-32x32.png`,
  copyright: "All rights reserved 2021, John Gruber",
  updated: new Date(), // optional, default = today
  generator: "GitBit", // optional, default = 'Feed for Node.js'
  feedLinks: {
    json: `${config.siteMetadata.siteUrl}/feed/feed.json`,
    atom: `${config.siteMetadata.siteUrl}/feed/atom.xml`
  },
  author: config.siteMetadata.author
});

articles.forEach(post => {
  feed.addItem({
    title: post.title,
    id: `${config.siteMetadata.siteUrl}/blog/${post.gitbitURL}`,
    link: `${config.siteMetadata.siteUrl}/blog/${post.gitbitURL}`,
    description: post.description,
    author: [ config.siteMetadata.author ],
    date: new Date(post.publishedDate),
    image: post.image
  })
})

feed.addCategory("Technologie");

feed.addContributor(config.siteMetadata.author);

fs.writeFileSync(`./static/feed/rss.xml`, feed.rss2())
fs.writeFileSync(`./static/feed/atom.xml`, feed.atom1())
fs.writeFileSync(`./static/feed/feed.json`, feed.json1())
 
