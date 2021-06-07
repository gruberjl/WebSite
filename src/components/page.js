import React from "react"
import Heading from './heading'
import PageHeader from './page-header'
import "./page.css"

export default function Page({ children }) {
  return (
    <div>
      <Heading />
      <PageHeader />
      {children}
    </div>
  )
}
