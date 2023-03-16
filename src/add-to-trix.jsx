import {createRoot} from "react-dom/client"
import TextAlignElement from "./text-align-element"
import Trix from "trix"

Trix.config.textAttributes.textAlign = {
  styleProperty: "text-align",
  tagName: "p"
}

export default function addToTrix(trix) {
  const toolbarElement = trix.editorController.toolbarController.element
  const textToolsElement = toolbarElement.querySelector(".trix-button-group--text-tools")
  const container = document.createElement("span")
  const css = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingRight: "4px"
  }

  for (const cssKey in css) {
    container.style[cssKey] = css[cssKey]
  }

  textToolsElement.append(container)

  const root = createRoot(container)

  root.render(
    <TextAlignElement trix={trix} />
  )
}
