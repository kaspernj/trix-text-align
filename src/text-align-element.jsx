import EventListener from "@kaspernj/api-maker/src/event-listener"
import PropTypes from "prop-types"
import React from "react"

export default class TextAlignElement extends React.PureComponent {
  static propTypes = {
    trix: PropTypes.object.isRequired
  }

  static possibleValues = ["left", "center", "right"]

  debugging = false
  defaultValue = undefined
  currentValue = this.defaultValue
  textAlignLeftButtonRef = React.createRef()
  textAlignCenterButtonRef = React.createRef()
  textAlignRightButtonRef = React.createRef()

  state = {
    active: undefined
  }

  render() {
    const {active} = this.state
    const styles = {
      left: {
        borderWidth: "1px",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: "3px",
        borderTopLeftRadius: "3px"
      },
      center: {borderWidth: "1px 0 1px 0"},
      right: {
        borderWidth: "1px",
        borderTopRightRadius: "3px",
        borderBottomRightRadius: "3px",
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0
      }
    }
    const activeStyle = styles[active]

    if (activeStyle) activeStyle.borderWidth = "3px"

    return (
      <div>
        <EventListener event="trix-selection-change" onCalled={this.onSelectionChanged} target={this.props.trix.editorController.editorElement} />
        <button onClick={this.onAlignTextLeftClicked} ref={this.textAlignLeftButtonRef} style={styles.left}>
          <i className="fa fa-fw fa-align-left" />
        </button>
        <button onClick={this.onAlignTextCenterClicked} ref={this.textAlignCenterButtonRef} style={styles.center}>
          <i className="fa fa-fw fa-align-center" />
        </button>
        <button onClick={this.onAlignTextRightClicked} ref={this.textAlignRightButtonRef} style={styles.right}>
          <i className="fa fa-fw fa-align-right" />
        </button>
      </div>
    )
  }

  debug(...args) {
    if (this.debugging) {
      console.log(...args)
    }
  }

  onAlignTextLeftClicked = (e) => {
    e.preventDefault()
    this.debug("onAlignTextLeftClicked")
    this.setActive("left")
  }

  onAlignTextCenterClicked = (e) => {
    e.preventDefault()
    this.debug("onAlignTextCenterClicked")
    this.setActive("center")
  }

  onAlignTextRightClicked = (e) => {
    e.preventDefault()
    this.debug("onAlignTextRightClicked")
    this.setActive("right")
  }

  setActive(newValue) {
    this.debug("setActive", newValue)
    this.currentValue = newValue
    this.setState({active: newValue})
    this.props.trix.editor.activateAttribute("textAlign", newValue)
  }

  onSelectionChanged = () => {
    this.debug("onSelectionChanged")
    this.syncTextAlignFromCurrentCursor()
  }

  pieceAtCursor() {
    const position = this.props.trix.editor.getPosition()

    return this.props.trix.editorController.composition.document.getPieceAtPosition(position)
  }

  syncTextAlignFromCurrentCursor = () => {
    const pieceAtCursor = this.pieceAtCursor()
    const textAlign = pieceAtCursor.getAttribute("textAlign")

    this.debug("syncTextAlignFromCurrentCursor", {textAlign})

    if (TextAlignElement.possibleValues.includes(textAlign)) {
      this.currentValue = textAlign
    } else {
      this.currentValue = this.defaultValue
    }

    if (this.state.active != this.currentValue) {
      this.setState({active: this.currentValue})
    }
  }
}
