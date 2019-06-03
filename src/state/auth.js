import { useEffect, useState } from "react"

import { auth } from "../services/firebase"

export function useAuth() {
  const [authStatus, setAuthStatus] = useState({
    loading: true,
    errorCode: undefined,
    user: undefined,
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      try {
        if (user === null) {
          // user signed out
          setAuthStatus({
            loading: false,
            user: null,
            errorCode: undefined,
          })
        } else {
          console.log(user.uid)
          // user signed in
          setAuthStatus({
            loading: false,
            errorCode: undefined,
            user: {
              id: user.uid,
            },
          })
        }
      } catch (error) {
        // logError("useAuth", error)
        setAuthStatus({
          loading: false,
          errorCode: error.message,
          user: undefined,
        })
      }
    })

    return unsubscribe
  }, [])

  return authStatus
}
