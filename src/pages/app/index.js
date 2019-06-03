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

const App = () => {
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
          <SessionProvider path="/app/:code">
            <Answer path="/" />
            <Results path="results" />
          </SessionProvider>

          <NotFound default />
        </Router>
      </UserProvider>
    </Layout>
  )
}

export default App
