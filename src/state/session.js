import React from "react"

import { firestore } from "../services/firebase"

function useSession(code) {
  const [sessionStatus, setSessionStatus] = React.useState({
    loading: true,
    error: undefined,
    responses: undefined,
  })

  React.useEffect(() => {
    setSessionStatus({
      loading: true,
      error: undefined,
      responses: undefined,
    })

    try {
      // subscribe function returns unsubscribe
      const unsubscribe = firestore
        .collection("responses")
        .where("code", "==", code)
        .onSnapshot(responsesSnapshot => {
          try {
            const responses =
              responsesSnapshot.size > 0
                ? responsesSnapshot.docs.map(doc => doc.data())
                : []

            setSessionStatus({
              loading: false,
              errorCode: undefined,
              responses,
            })
          } catch (error) {
            // logError("useSurveyInstance", error)
            setSessionStatus({
              loading: false,
              error: error.toString(),
              responses: undefined,
            })
          }
        })

      return () => {
        unsubscribe()
      }
    } catch (error) {
      // logError("useSurveyInstance", error)
      setSessionStatus({
        loading: false,
        error: error.toString(),
        responses: undefined,
      })
    }
  }, [code])

  return sessionStatus
}

const SessionContext = React.createContext(null)

export function SessionProvider({ children, code }) {
  const sessionStatus = useSession(code)

  if (sessionStatus.loading) {
    return <div>LOADING</div>
  }

  if (sessionStatus.error) {
    return <div>ERROR</div>
  }

  return (
    <SessionContext.Provider value={sessionStatus.responses}>
      {children}
    </SessionContext.Provider>
  )
}

export function useResponses() {
  return React.useContext(SessionContext)
}
