import React from "react"
import { Link, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Typography } from "@material-ui/core"

const JoinPage = () => {
  const [code, setCode] = React.useState("")
  const codeInputRef = React.useRef(null)

  const digitStyle = {
    width: "30px",
    borderBottom: "2px solid black",
  }

  React.useEffect(() => {
    if (code.length === 4) {
      navigate(`/app/${code}`)
    }
  }, [code])

  return (
    <Layout>
      <SEO title="Home" />
      <Typography variant="h4" component="h2" style={{ textAlign: "center" }}>
        Enter the 4-digit code to get started
      </Typography>
      <input
        ref={codeInputRef}
        className="visually-hidden"
        type="number"
        min={0}
        max={9999}
        autoFocus
        value={code}
        onChange={event => setCode(event.target.value)}
        onKeyDown={event => {
          // ignore arrow keys for this input
          // since the user can't see the cursor, it's confusing when it moves
          // also, the default behavior of up/down is to increment/decrement the input value
          // which is not what we want
          switch (event.key) {
            // IE/Edge use Up/Right/Down/Left
            // Other browsers use Arrow*
            case "Up":
            case "Right":
            case "Down":
            case "Left":
            case "ArrowUp":
            case "ArrowRight":
            case "ArrowDown":
            case "ArrowLeft":
              event.preventDefault()
              break
            default:
              break
          }
        }}
      />
      <div
        id="code-container"
        style={{
          margin: "50px auto",
          display: "flex",
          justifyContent: "space-evenly",
          maxWidth: 300,
          padding: "20px",
          height: "3.3rem", // text-size is 3rem, so this adds a bit of a buffer
        }}
        onClick={() => {
          if (codeInputRef.current !== null) {
            codeInputRef.current.focus()
          }
        }}
      >
        {[0, 1, 2, 3].map(digitIndex => (
          <Typography
            key={`code-digit-${digitIndex}`}
            variant="h3"
            component="pre"
            style={digitStyle}
          >
            {code.charAt(digitIndex) || ""}
          </Typography>
        ))}
      </div>
    </Layout>
  )
}

export default JoinPage
