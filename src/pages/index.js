import React from "react"
import { Link, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Button, Typography } from "@material-ui/core"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Typography variant="h3" component="h2">
            Handz
          </Typography>
          <Typography>"A virtual show of hands"</Typography>
        </div>

        <Typography>You can:</Typography>

        <div style={{ textAlign: "center" }}>
          <Link to="/join" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Join a session
            </Button>
          </Link>
          <Typography>(You give us a code)</Typography>
        </div>

        <Typography>or</Typography>

        <div style={{ textAlign: "center" }}>
          <Link to="/ask" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary">
              Start a session
            </Button>
          </Link>
          <Typography>(We give you a code)</Typography>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
