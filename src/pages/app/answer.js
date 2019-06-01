import React from "react"
import { useUser } from "../../state/user"
import { firestore } from "../../services/firebase"
import { useResponses } from "../../state/session"
import { AnimatedBar } from "../../components/animated-bar"
import { animated, useSpring } from "react-spring"
import { Emoji } from "../../components/emoji"

function submitAnswer({ code, uid, isYes }) {
  firestore
    .collection("responses")
    .doc(`${code}-${uid}`) // response uniquely identified by code+uid combo
    .set({
      code,
      uid,
      isYes,
    })
}

function removeAnswer({ code, uid }) {
  firestore
    .collection("responses")
    .doc(`${code}-${uid}`) // response uniquely identified by code+uid combo
    .delete()
}

export const Answer = props => {
  const { code } = props

  const user = useUser()
  const responses = useResponses()

  const existingResponse = responses.find(response => response.uid === user.id)

  const yesResponses = responses.filter(response => response.isYes)

  const nResponses = responses.length
  const nYes = yesResponses.length

  const yesPercent = (100 * nYes) / nResponses

  const yesLabelElRef = React.useRef(null)
  const noLabelElRef = React.useRef(null)
  const underlineWidth = 50
  const [underlinePosition, setUnderlinePosition] = React.useState(null)
  React.useEffect(() => {
    if (!existingResponse) {
      setUnderlinePosition(null)
      return
    }

    const elRef = existingResponse.isYes ? yesLabelElRef : noLabelElRef

    if (elRef.current === null) {
      setUnderlinePosition(null)
      return
    }

    const clientBoundingRect = elRef.current.getBoundingClientRect()

    setUnderlinePosition(clientBoundingRect.x)
  }, [existingResponse])

  const animatedProps = useSpring({
    transform:
      underlinePosition !== null
        ? `translateX(${underlinePosition.toString()}px)`
        : "translateX(0px)",
  })

  return (
    <div
      style={{
        boxSizing: "border-box",
        height: `100%`,
        display: "grid",
        gridTemplateColumns: "50% 50%",
        gridTemplateRows: "10% 60% 20% 2px 10%",
      }}
    >
      <h2 style={{ gridArea: "1 / 1" }}>{code}</h2>
      {!existingResponse && (
        <div
          style={{
            gridArea: "2 / 1 / auto / span 2",
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <h2 style={{ padding: 10 }}>
            <span role="img" aria-label="Downward-pointing-hand emoji">
              👇
            </span>
          </h2>
          <h3 style={{ textAlign: "center" }}>Is your hand UP or DOWN?</h3>
          <h2 style={{ padding: 10 }}>
            <span role="img" aria-label="Downward-pointing-hand emoji">
              👇
            </span>
          </h2>
        </div>
      )}
      {existingResponse && (
        <div
          style={{
            boxSizing: "border-box",
            paddingBottom: "20px",
            gridArea: "2 / 1 / auto / span 2",
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ height: "inherit" }}>
            <h3 style={{ textAlign: "center" }}>{nYes}</h3>
            <div style={{ height: "90%" }}>
              <AnimatedBar
                color="rebeccapurple"
                borderColor="#aaaaaa"
                value={yesPercent}
              />
            </div>
          </div>

          <div style={{ height: "inherit" }}>
            <h3 style={{ textAlign: "center" }}>{nResponses - nYes}</h3>
            <div style={{ height: "90%" }}>
              <AnimatedBar
                color="rebeccapurple"
                borderColor="#aaaaaa"
                value={100 - yesPercent}
              />
            </div>
          </div>
        </div>
      )}
      <div
        id="answer-radios"
        style={{
          gridArea: "3 / 1 / auto / span 2",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <input
          id="yes-radio"
          className="visually-hidden"
          type="radio"
          name="answer-radios"
          checked={existingResponse && existingResponse.isYes === true}
          onChange={event => {
            if (event.target.checked) {
              submitAnswer({ code, uid: user.id, isYes: true })
            }
          }}
        />
        <label
          style={{ height: "50%" }}
          ref={yesLabelElRef}
          htmlFor="yes-radio"
        >
          <Emoji
            style={{ maxHeight: "100%" }}
            emojiShortName=":person_raising_hand:"
          />
        </label>
        <input
          id="no-radio"
          className="visually-hidden"
          type="radio"
          name="answer-radios"
          checked={existingResponse && existingResponse.isYes === false}
          onChange={event => {
            if (event.target.checked) {
              submitAnswer({ code, uid: user.id, isYes: false })
            }
          }}
        />
        <label style={{ height: "50%" }} ref={noLabelElRef} htmlFor="no-radio">
          <Emoji
            style={{ maxHeight: "100%" }}
            emojiShortName=":person_gesturing_no:"
          />
        </label>
      </div>
      {existingResponse && (
        <div
          style={{
            gridArea: "4 / 1 / auto / span 2",
            width: "100%",
            height: "2px",
          }}
        >
          <animated.div
            style={{
              width: underlineWidth,
              height: "100%",
              backgroundColor: "rebeccapurple",
              ...animatedProps,
            }}
          />
        </div>
      )}
      <div
        style={{
          gridArea: "5 / 1 / auto / span 2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            border: "1px solid rebeccapurple",
            color: "rebeccapurple",
            backgroundColor: "unset",
            textTransform: "uppercase",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
          }}
          onClick={() => removeAnswer({ code, uid: user.id })}
        >
          Clear
        </button>
      </div>
    </div>
  )
}
