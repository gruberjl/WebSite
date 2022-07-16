import * as React from "react"
import { Link, navigate } from "gatsby"

// styles
const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
}

const NotFoundPage = () => {
  const isBrowser = () => typeof window !== 'undefined'
  let pathname, search, hash

  if (isBrowser()) {
    pathname = window.location.pathname
    search = window.location.search
    hash = window.location.hash
    
    if (pathname.endsWith('/')) {
      navigate(pathname.slice(0,-1) + search + hash)
    }
  }

  return (
    <main style={pageStyles}>
      <title>Not found</title>
      <h1 style={headingStyles}>Page not found</h1>
      <p style={paragraphStyles}>
        Sorry{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try going back or go to the <Link to="/">home page</Link>.
            <br />
          </>
        ) : null}
        <br />

      </p>
    </main>
  )
}

export default NotFoundPage
