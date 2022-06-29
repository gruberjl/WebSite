const fs = require('fs')
const {By, Key} = require('selenium-webdriver')
const {chrome, medium, db} = require('lib')
const cheerio = require('cheerio')

const getMediumArticle = async (url, browser='') => {
  if (browser === '') {
    browser = await login()
  }

  const details = await getDetails(browser, url)
  await writeFile(details)
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
    await browser.sleep(500)
    await body.sendKeys(Key.PAGE_DOWN)
    isBottom = await isBottomOfPage(browser)
    if (new Date().getTime() > timeout) isBottom = true
  }
} 

const getDetails = async (browser, url) => {
  const details = await medium.article.getDetails(browser, url, false)
  await browser.sleep(1000)
  await scrollToBottom(browser)
  details.title = details.title.split('|')[0].trim()
  details.gitbitURL = details.title.replace(/ /g, "-").toLowerCase().replace(/[^a-zA-Z0-9-_]/g, '')
  details.article = await (await browser.findElement(By.css('article'))).getAttribute('innerHTML')
  details.html = cleanHtml(details.article)

  return details
}

const cleanHtml = (html) => {
  const html2 = html.substring(html.indexOf("<h1"))
  const $ = cheerio.load(html2)

  $('*').each(function() {
    $(this).removeAttr("class")
    $(this).removeAttr("data-selectable-paragraph")
    $(this).removeAttr("id")
    $(this).removeAttr("style")

    if ($(this).attr('tabindex') || $(this).attr('tabindex') == '') {
      const tabindex = $(this).attr('tabindex')
      $(this).removeAttr('tabindex')
      $(this).attr('tabIndex', tabindex)
    }
  })

  $('noscript').each(function() {
    $(this).remove()
  })

  $('path').each(function() {
    $(this).remove()
  })

  $('button').each(function() {
    $(this).remove()
  })

  $('img').each(function() {
    if ( ($(this).attr('src') && $(this).attr('src').endsWith('?q=20')) || $(this).attr('alt') == 'John Gruber' ) {
      $(this).remove()
    }

    if ($(this).attr('srcset') || $(this).attr('srcset') == '') {
      const srcSet = $(this).attr('srcset')
      $(this).removeAttr('srcset')
      $(this).attr('srcSet', srcSet)
    }
  })

  $('p').each(function() {
    const text = $(this).text()
    if(text == '[' || text == 'John Gruber' || text.startsWith('](/@gruberjl') || text.endsWith('min read')) {
      $(this).remove()
    }
  })

  $('div').each(function() {
    const text = $(this).text()
    if(text.endsWith('min read')) {
      $(this).remove()
    }
  })

  $('p:empty').each(function() {
    $(this).remove()
  })

  $('svg').each(function() {
    $(this).remove()
  })

  $('a').each(function() {
    if ($(this).attr('href').startsWith('/')) {
      $(this).remove()
    }
  })

  const pattern = /(<img[^>]*)>/g;

  let output = $('body').html().replace(pattern, "$1/>")
  output = output.replaceAll('<br>', '<br/>'")
  return output
}

const writeFile = async (articleDetail) => {
  const file = fs.readFileSync('./src/pages/blog/blog-article.js', 'utf8')
  let newFile = file.replace('ArticleHTML', articleDetail.html)
  newFile = newFile.replace('CanonicalURL', articleDetail.url)
  const title = articleDetail.title ? articleDetail.title : ''
  const description = articleDetail.description ? articleDetail.description : ''
  newFile = newFile.replace('titleURL', title)
  newFile = newFile.replace('descriptionHere', description)
  fs.writeFileSync(`./src/pages/blog/${articleDetail.gitbitURL}.js`, newFile)
}

// getMediumArticle('https://medium.com/gitbit/11-pro-tips-and-tricks-for-using-microsoft-onedrive-34a235deea2c')
// const html = fs.readFileSync('./src/pages/blog/1.html', 'utf8')
// console.log(cleanHtml(html))
module.exports = {getMediumArticle, getDetails, writeFile}
