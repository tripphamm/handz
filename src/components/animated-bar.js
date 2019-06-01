import React from "react"
import { useSpring, animated } from "react-spring"

export function AnimatedBar({ value, color, borderColor }) {
  if (value > 100) {
    console.warn("AnimatedBar value set to > 100")
  }

  const animatedProps = useSpring({ height: `${value}%` })

  return (
    <div
      style={{
        transform: "rotate(180deg)",
        height: "100%",
        width: 40,
        border: `1px solid ${borderColor}`,
        backgroundColor: "papayawhip",
      }}
    >
      <animated.div
        style={{
          backgroundColor: color,
          ...animatedProps,
        }}
      />
    </div>
  )
}
