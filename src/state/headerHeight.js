import React from "react"

export function useHeaderHeight() {
  const [headerHeight, setHeaderHeight] = React.useState(18)

  React.useLayoutEffect(() => {
    if (window) {
      const headerEl = document.getElementById("layout-header")

      if (headerEl !== null) {
        const headerRect = headerEl.getBoundingClientRect()
        const headerStyle = window.getComputedStyle(headerEl)

        const height = ["top", "bottom"]
          .map(side => {
            const value = headerStyle["margin-" + side]
            return parseFloat(value.replace("px", ""))
          })
          .reduce((total, sideHeight) => {
            return total + sideHeight
          }, headerRect.height)

        setHeaderHeight(height)
      }
    }
  }, [])

  return headerHeight
}
