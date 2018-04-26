const Hover = require('hover-engine')
const battery = require('../../hover-battery')
const actions = require('./actions')

const sessionEngine = new Hover()
  .addActions(actions)
  .addListener(battery(sessionStorage).listener)
  .addActions(battery(sessionStorage).actions)

const addAction = (action, params) => {
  const actElement = document.createElement('div')
  actElement.id = action
  actElement.addEventListener('click', () => sessionEngine.actions[action](params))
  document.body.appendChild(actElement)
}

addAction('up')
addAction('start', 'work')

window.engine = sessionEngine
