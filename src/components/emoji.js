import * as React from "react"

import { getImageSrcByShortName } from "../utils/emojiUtil"

export const Emoji = props => {
  const { emojiShortName, size, ...htmlProps } = props

  let emojiImageSize = 128
  if (size < 32) {
    emojiImageSize = 32
  } else if (size <= 64) {
    emojiImageSize = 64
  } else if (size <= 128) {
    emojiImageSize = 128
  } else {
    console.warn(
      `Maximum emoji image size is 128px. ${size} is too large and the image quality will suffer`
    )
  }

  return (
    <img
      src={getImageSrcByShortName(emojiShortName, { size: emojiImageSize })}
      alt={`${emojiShortName.replace(/:/g, "").replace(/_/g, " ")} emoji`}
      {...htmlProps}
    />
  )
}
