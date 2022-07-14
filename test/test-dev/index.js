const glob = require('glob')
const SeoAnalyzer = require('seo-analyzer')

const seoTest = async () => {
  const files = glob.sync('./docs/**/*.html')
    .filter(file => file !== './docs/page-data/404.html')
    .filter(file => file !== './docs/404.html')
    .filter(file => file !== './docs/offline-plugin-app-shell-fallback.html')

  const errors = new SeoAnalyzer()
    .inputFiles(files)
    .addRule('titleLengthRule', { min: 10, max: 50 })
    .addRule(imgTagWithAltAttritubeRule)
    // .addRule('aTagWithRelAttributeRule')
    .addRule('metaBaseRule', { list: ['description', 'viewport'] })
    .addRule('metaSocialRule', {
      properties: [
        'og:url',
        'og:type',
        'og:site_name',
        'og:title',
        'og:description',
        'og:image',
        'og:image:width',
        'og:image:height',
        'twitter:card',
        'twitter:site',
        'twitter:title',
        'twitter:description',
        'twitter:image'
      ],
    })
    .addRule(canonicalLinkRule)
    .outputConsole()
    // How to get errors from object
    // .outputObject(obj => {
    //   console.log(obj)
    //   if (obj.length > 0)
    //     console.log('Error in SEO in dev environment')
    // })
}

function canonicalLinkRule(dom) {
  return new Promise(resolve => {
    const element = dom.window.document.querySelector(
      'head > link[rel="canonical"]'
    );
    if (!element) {
      resolve('This HTML without <link rel="canonical" href="..."> link');
    }
    if (element && !element.href) {
      resolve('The canonical link without href attribute');
    }
    if (element && element.href.substr(-1) === '/' && element.href !== 'https://gitbit.org/') {
      console.log(element.href)
      resolve(
        'The canonical link has a slash at the end of the link.'
      );
    }
    resolve(null);
  });
}

function imgTagWithAltAttritubeRule(dom) {
  return new Promise(resolve => {
    let count = 0;
    const elements = dom.window.document.querySelectorAll('img');
    elements.forEach(element => {
      if (!element.alt &&element.style._values.display !== "none" ) {
        count++;
      }
    });
    if (count > 0) {
      resolve(`There are ${count} <img> tag without alt attribute`);
    }
    resolve(null);
  });
}

seoTest()
