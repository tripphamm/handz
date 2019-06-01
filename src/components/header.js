import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    id="layout-header"
    style={{
      background: `rebeccapurple`,
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
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
