import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/styles"

const Header = ({ siteTitle }) => {
  const theme = useTheme()

  console.log(theme)
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
          }}
        >
          <Typography variant="h3" component="h1">
            {siteTitle}
          </Typography>
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
