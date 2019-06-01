import React from "react"

const UserContext = React.createContext(null)

export const UserProvider = UserContext.Provider

export function useUser() {
  return React.useContext(UserContext)
}
