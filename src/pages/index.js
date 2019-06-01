import React from "react"
import { Link, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const [codeText, setCodeText] = React.useState("")

  return (
    <Layout>
      <SEO title="Home" />
      <h1>
        <span role="img" aria-label="waiving hand emoji">
          👋
        </span>{" "}
        Hi there.
      </h1>
      <label htmlFor="join-code-input">Join the fun:</label>
      <input
        id="join-code-input"
        type="text"
        placeholder="4-digit code"
        value={codeText}
        onChange={event => setCodeText(event.target.value)}
      />
      <button onClick={() => navigate(`/app/${codeText}`)}>Go</button>
      <p>
        Or <Link to="/ask">ask your own question</Link>
      </p>
    </Layout>
  )
}

export default IndexPage
