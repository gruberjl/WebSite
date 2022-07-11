import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import 'bootstrap/dist/css/bootstrap.min.css'
import GitBitImg from "../images/gitbit-icon-500x500.png"

const getDescription = (propsDescription) => {
  if (propsDescription) {
    let description = propsDescription
    if (description.length > 147)
      description = description.substring(0, 156) + '...'
    return description
  }

  return 'Learn, prepare and training for the Microsoft Microsoft Office 365 Exam MS-500: Microsoft 365 Security Administration MS-500 exam'
}

const getTitle = (propsTitle) => {
  if (propsTitle) {
    let title = propsTitle
    if (title.length > 58)
      title = title.substring(0, 58) + '...'
    return title
  }

  return 'Training for MS-500: Microsoft Office 365 Security Admin'
}

const getImageUrl = (image) => {
  if (image && image.startsWith('/'))
    return `https://www.gitbit.org${image}`

  return image
}

const getJsonLd = (jsonLdType, id, title, description, image, jsonLd={}) => {
  if (!jsonLdType)
    return null

  const jsonLD = [
    Object.assign({},
      {
        "audience": {
          "@type": "Audience",
          "audienceType": [
            "Anyone who wants to learn about Microsoft 365."
          ]
        },
        "image": getImageUrl(image) || GitBitImg,
        "provider": {
          "@type": "Organization",
          "sameAs": "www.gitbit.org",
          "name": "GitBit"
        },
        "about": {
          "name": "Microsoft 365"
        },
        "name": title,
        "creator": [
          {
            "@type": "Person",
            "name": "John Gruber"
          }
        ],
        "@id": id.endsWith('/') ? id.slice(0, -1) : id,
        "inLanguage": "en",
        "publisher": {
          "@type": "Organization",
          "sameAs": "www.gitbit.org",
          "name": "GitBit"
        },
        "@type": jsonLdType,
        "isAccessibleForFree": true,
        "description": description,
        "@context": "http://schema.org"
      },
      jsonLd
    )
  ]

  return jsonLD
}

export default function Heading(props) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )
  const location = useLocation()
  let canonicalUrl = props.canonical ? props.canonical : data.site.siteMetadata.siteUrl + location.pathname
  if (canonicalUrl.endsWith('/'))
    canonicalUrl = canonicalUrl.slice(0, -1)
  const description = getDescription(props.description)
  const title = getTitle(props.title)
  const pageTitle = title + ' - GitBit'

  const jsonLD = getJsonLd(props.jsonLdType, data.site.siteMetadata.siteUrl + location.pathname, title, description, props.image, props.jsonLd)
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
        <meta name="facebook-domain-verification" content="1nlatnunvaxj999yoouv3dqpbhcll8" />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="GitBit" />
        <meta property="og:image" itemprop="image primaryImageOfPage" content={getImageUrl(props.image) || GitBitImg} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:domain" content="gitbit.org" />
        <meta name="twitter:title" property="og:title" itemprop="name" content={title} />
        <meta name="twitter:description" property="og:description" itemprop="description" content={description} />
        <meta name="twitter:app:country" content="US" />
        <meta name="twitter:site" content="@gruberjl" />
        <link rel="alternate" type="application/rss+xml" href={`${data.site.siteMetadata.siteUrl}/feed/rss.xml`} />
        <link rel="alternate" type="application/atom+xml" href={`${data.site.siteMetadata.siteUrl}/feed/atom.xml`} />
        <link rel="alternate" title={'Training for MS-500: Microsoft Office 365 Security Admin'} type="application/json" href={`${data.site.siteMetadata.siteUrl}/feed/feed.json`} />
        {
          jsonLD ?
            <script type="application/ld+json">
              {JSON.stringify(jsonLD)}
            </script> :
            ''
        }
        <script>
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '900156661378693');
          fbq('track', 'PageView');`}
        </script>
        <noscript>{`<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=900156661378693&ev=PageView&noscript=1"/>`}</noscript>
      </Helmet>
    </div>
  )
}
