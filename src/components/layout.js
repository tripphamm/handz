/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Div100vh from "react-div-100vh"
import { createMuiTheme } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"

import Header from "./header"
import "./layout.css"

const theme = createMuiTheme()

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => {
      return (
        <ThemeProvider theme={theme}>
          <Div100vh>
            <Header siteTitle={data.site.siteMetadata.title} />
            <div
              style={{
                boxSizing: "border-box",
                margin: `0 auto`,
                maxWidth: 960,
                height: `calc(100vh - 5rem)`,
                overflow: "hidden",
                padding: "2rem",
              }}
            >
              <main style={{ height: "100%" }}>{children}</main>
            </div>
          </Div100vh>
        </ThemeProvider>
      )
    }}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
