const fs = require('fs')
const {By, Key} = require('selenium-webdriver')
const {chrome, medium, db} = require('lib')
const getMediumArticle = require('./get-medium-article')

const getMediumArticles = async (url) => {
  const browser = await login()
  await chrome.get(browser, 'https://medium.com/me/stories/public')
  await scrollToBottom(browser)
  const urls = await getArticles(browser)
  const articleDetails = await getDetails(browser, urls)
  await writeFiles(articleDetails)
  await writeBlogArticles(articleDetails)
}

const login = async (id='gruberjl-medium') => {
  const account = await db.accounts.get(id)
  const browser = await chrome.build()
  await browser.get('https://medium.com')
  await chrome.addCookiesToBrowser(browser, account.cookies)

  return browser
}

const isBottomOfPage = async (browser) => {
  return await browser.executeScript('if (document.body.scrollHeight == window.innerHeight + window.scrollY) { return true; } else { return false; }')
}

const scrollToBottom = async (browser) => {
  let isBottom = false
  const timeout = (new Date().getTime()) + (1000 * 60)
  const body = await browser.findElement(By.css('body'))

  while (!isBottom) {
    await browser.sleep(1000)
    await body.sendKeys(Key.PAGE_DOWN)
    isBottom = await isBottomOfPage(browser)
    if (new Date().getTime() > timeout) isBottom = true
  }
} 

const getArticles = async (browser) => {
  const links = await browser.findElements(By.css('h3 a')).catch(() => undefined)
  const urls = []
  for (let i = 0; i < links.length; i++) {
    urls.push((await links[i].getAttribute('href')).toLowerCase().split('?')[0])
  }

  return [...new Set(urls)]
}

const getDetails = async (browser, urls) => {
  const articleDetails = []

  for (let i = 0; i < urls.length; i++) {
    articleDetails.push(await getMediumArticle.getDetails(browser, urls[i]))
  }

  return articleDetails
}

const writeFiles = async (articleDetails) => {
  for (let i = 0; i < articleDetails.length; i++) {
    await getMediumArticle.writeFile(articleDetails[i])
  }
}

const writeBlogArticles = async (articleDetails) => {
  let cloned = JSON.parse(JSON.stringify(articleDetails))
  cloned = cloned.map(articleDetail => {
    delete articleDetail.article
    delete articleDetail.html
    return articleDetail
  })
  let output = JSON.stringify(cloned, null, 2)
  output = 'module.exports = {articles:' + output + '}'
  fs.writeFileSync('./src/components/blog-articles.js', output)
}

getMediumArticles()

module.exports = {getMediumArticles}
