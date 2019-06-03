import React from "react"
import { Button, Radio, RadioGroup, Typography } from "@material-ui/core"

import { useUser } from "../../state/user"
import { firestore } from "../../services/firebase"
import { useResponses } from "../../state/session"
import { AnimatedBar } from "../../components/animated-bar"
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
      <Typography variant="h4" component="p" style={{ gridArea: "1 / 1" }}>
        {code}
      </Typography>
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
          <Typography style={{ textAlign: "center" }}>
            Is your hand UP or DOWN?
          </Typography>
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
          <div
            style={{
              height: "inherit",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography style={{ height: "10%", textAlign: "center" }}>
              {nYes}
            </Typography>
            <div style={{ flexGrow: 1 }}>
              <AnimatedBar
                color="rebeccapurple"
                borderColor="#aaaaaa"
                value={yesPercent}
              />
            </div>
          </div>

          <div
            style={{
              height: "inherit",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography style={{ height: "10%", textAlign: "center" }}>
              {nResponses - nYes}
            </Typography>
            <div style={{ flexGrow: 1 }}>
              <AnimatedBar
                color="rebeccapurple"
                borderColor="#aaaaaa"
                value={100 - yesPercent}
              />
            </div>
          </div>
        </div>
      )}
      <RadioGroup
        aria-label="Hand up or down"
        name="handz"
        style={{
          gridArea: "3 / 1 / auto / span 2",

          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Radio
          inputProps={{ "aria-label": "Hand is up" }}
          checked={Boolean(existingResponse) && existingResponse.isYes === true}
          onChange={event => {
            if (event.target.checked) {
              submitAnswer({ code, uid: user.id, isYes: true })
            }
          }}
          icon={<Emoji size={64} emojiShortName=":person_raising_hand:" />}
          checkedIcon={
            <Emoji
              size={80}
              style={{ borderBottom: `2px solid` }}
              emojiShortName=":person_raising_hand:"
            />
          }
        />
        <Radio
          inputProps={{ "aria-label": "Hand is down" }}
          checked={
            Boolean(existingResponse) && existingResponse.isYes === false
          }
          onChange={event => {
            if (event.target.checked) {
              submitAnswer({ code, uid: user.id, isYes: false })
            }
          }}
          icon={<Emoji size={64} emojiShortName=":person_gesturing_no:" />}
          checkedIcon={
            <Emoji
              size={80}
              style={{ borderBottom: `2px solid` }}
              emojiShortName=":person_gesturing_no:"
            />
          }
        />
      </RadioGroup>
      <div
        style={{
          gridArea: "5 / 1 / auto / span 2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => removeAnswer({ code, uid: user.id })}
        >
          Clear
        </Button>
      </div>
    </div>
  )
}
