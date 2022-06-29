import React from "react"
import Heading from './heading'
import PageHeader from './page-header'
import "./page.css"

export default function Page({ children, canonical, title, description, jsonLdType, image, jsonLd }) {
  return (
    <div>
      <Heading canonical={canonical} title={title} description={description} jsonLdType={jsonLdType} image={image} jsonLd={jsonLd} />
      <PageHeader />
      {children}
    </div>
  )
}
 
