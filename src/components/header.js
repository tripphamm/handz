import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/styles"

import { Emoji } from "./emoji"

const Header = ({ siteTitle }) => {
  const theme = useTheme()

  return (
    <header
      id="layout-header"
      style={{
        background: theme.palette.primary.main,
        height: "5rem",
        paddingLeft: "2rem",
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          height: "inherit",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Emoji
            emojiShortName=":person_raising_hand:"
            size={64}
            style={{ maxHeight: "3.5rem", maxWidth: "3.5rem" }}
            aria-label={`${siteTitle} logo`}
          />
        </Link>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
