import React from "react"

import { useResponses } from "../../state/session"
import { AnimatedBar } from "../../components/animated-bar"

export const Results = props => {
  const { code } = props

  const responses = useResponses()

  const yesResponses = responses.filter(response => response.isYes)

  const nResponses = responses.length
  const nYes = yesResponses.length

  const yesPercent = (100 * nYes) / nResponses

  return (
    <>
      <h2>{code}</h2>
      <h1>
        <span role="img" aria-label="waiving hand emoji">
          👋
        </span>{" "}
        Hi there.
      </h1>
      {nResponses === 0 ? (
        <div>No responses yet</div>
      ) : (
        <>
          <h2 style={{ fontSize: "5rem", textAlign: "center" }}>
            {`${nYes} / ${nResponses}`}{" "}
            <span role="img" aria-label="Raised-hand emoji">
              🙋‍♀️
            </span>
          </h2>
          <AnimatedBar
            color="rebeccapurple"
            borderColor="#aaaaaa"
            value={yesPercent}
          />
        </>
      )}
    </>
  )
}
