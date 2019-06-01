import React from "react"
import { Link } from "gatsby"

export const NotFound = () => (
  <>
    <h1>
      <span role="img" aria-label="Face-palm emoji">
        🤦‍♂️
      </span>{" "}
      Oof. We can't find the page that you're looking for
    </h1>
    <Link to="/">Head home</Link>
  </>
)
