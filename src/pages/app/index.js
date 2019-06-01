import React from "react"
import { Router } from "@reach/router"
import Layout from "../../components/layout"
import { Answer } from "./answer"
import { Results } from "./results"
import { auth as firebaseAuth } from "../../services/firebase"
import { useAuth } from "../../state/auth"
import { UserProvider } from "../../state/user"
import { NotFound } from "./not-found"
import { SessionProvider } from "../../state/session"
import { useHeaderHeight } from "../../state/headerHeight"

const App = () => {
  React.useEffect(() => {
    if (window) {
      const userIsTabbingClass = "user-is-tabbing"

      const handleNextTab = event => {
        const code = event.keyCode ? event.keyCode : event.which
        if (code === 9) {
          // enable tabbing-mode
          window.document.body.classList.add(userIsTabbingClass)
          // stop listening for tabs
          window.removeEventListener("keydown", handleNextTab)
          // listen for a click to disable tabbing-mode
          window.addEventListener("mousedown", handleNextClick)
        }
      }

      const handleNextClick = () => {
        // disable tabbing-mode
        window.document.body.classList.remove(userIsTabbingClass)

        // stop listening for clicks
        window.removeEventListener("mousedown", handleNextClick)
        // listen for a tab to enable tabbing-mode
        window.addEventListener("keydown", handleNextTab)
      }

      // listen for a tab to enable tabbing-mode
      window.addEventListener("keydown", handleNextTab)
    }
  }, [])

  const auth = useAuth()

  React.useEffect(() => {
    // if the user is loaded, but still null, sign them in
    if (!auth.loading && !auth.errorCode && auth.user === null) {
      firebaseAuth.signInAnonymously()
    }
  }, [auth])

  if (auth.error) {
    return (
      <Layout>
        <div>Error</div>
      </Layout>
    )
  }

  if (auth.loading || auth.value === null) {
    return (
      <Layout>
        <div>Loading</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <UserProvider value={auth.user}>
        <Router id="handz-router">
          <SessionProvider path="/app/:code" style={{ height: "100%" }}>
            <Answer path="/" style={{ height: "100%" }} />
            <Results path="results" />
          </SessionProvider>

          <NotFound default />
        </Router>
      </UserProvider>
    </Layout>
  )
}

export default App
