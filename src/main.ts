import './components/ct-ball'
import './components/ct-selection'

const BALL_TAG_NAME = 'browser-translate-ball'
const SELECTION_TAG_NAME = 'browser-translate-selection'

document.documentElement.dataset.browserTranslate = 'booting'

function appendOnce(tagName: string) {
  if (document.querySelector(tagName)) {
    return
  }

  document.documentElement.appendChild(document.createElement(tagName))
}

try {
  appendOnce(BALL_TAG_NAME)
  appendOnce(SELECTION_TAG_NAME)
  document.documentElement.dataset.browserTranslate = 'ready'
}
catch (error) {
  document.documentElement.dataset.browserTranslate = 'error'
  console.error('[browser-translate] failed to mount', error)
}
