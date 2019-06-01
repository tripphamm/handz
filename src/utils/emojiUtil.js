const defaultImageSrc =
  "https://cdn.jsdelivr.net/emojione/assets/3.1/png/32/2753.png"

function resize(imageSrc, size) {
  return imageSrc.replace("/64/", `/${size}/`)
}

const perfOptimizedEmojiMap = {
  ":person_raising_hand:":
    "https://cdn.jsdelivr.net/emojione/assets/4.5/png/64/1f64b.png",
  ":person_gesturing_no:":
    "https://cdn.jsdelivr.net/emojione/assets/4.5/png/64/1f645.png",
}

export function getImageSrcByShortName(shortName, options = {}) {
  const { size = 64 } = options

  let imageSrc = perfOptimizedEmojiMap[shortName]
  if (!imageSrc) {
    imageSrc = defaultImageSrc
  }

  return resize(imageSrc, size)
}
