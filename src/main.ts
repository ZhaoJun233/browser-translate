import './components/ct-ball'
import './components/ct-selection'

const BALL_TAG_NAME = 'browser-translate-ball'
const SELECTION_TAG_NAME = 'browser-translate-selection'

function appendOnce(tagName: string) {
  if (document.querySelector(tagName)) {
    return
  }

  document.documentElement.appendChild(document.createElement(tagName))
}

appendOnce(BALL_TAG_NAME)
appendOnce(SELECTION_TAG_NAME)
