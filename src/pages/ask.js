import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

function generateCode() {
  const codeLength = 4
  const validCharacters = "1234567890"
  const getRandomIndex = () =>
    Math.floor(Math.random() * validCharacters.length)

  let code = ""
  for (let i = 0; i < codeLength; i++) {
    code += validCharacters.charAt(getRandomIndex())
  }

  return code
}

const Ask = () => (
  <Layout>
    <SEO title="Ask for a show of hands" />
    <h1>
      <span role="img" aria-label="Rock-on emoji">
        🤘
      </span>{" "}
      Let's get started!
    </h1>
    <ul>
      <li>
        <span role="img" aria-label="Writing emoji">
          ✍️
        </span>{" "}
        We'll give you a secret code
      </li>
      <li>
        <span role="img" aria-label="Hand-shake emoji">
          🤝
        </span>{" "}
        You'll tell your audience to enter the code at handz.live
      </li>
      <li>
        <span role="img" aria-label="Thumbs-up emoji">
          👍
        </span>{" "}
        That's it
      </li>
    </ul>
    <Link to={`/app/${generateCode()}/results`}>Get my code</Link>

    <p>
      Or <Link to="/">join an existing group</Link>
    </p>
  </Layout>
)

export default Ask
