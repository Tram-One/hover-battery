
const actionGroups = {
  votes: {
    init: () => 0,
    up: (state) => state + 1,
    down: (state) => state - 1
  },
  todos: {
    init: () => [],
    addTodo: (state, newTodo) => state.concat(newTodo)
  },
  timers: {
    init: () => ({work: false, email: false, break: false}),
    start: (state, timer) => Object.assign({}, state, {[timer]: true}),
    stop: (state, timer) => Object.assign({}, state, {[timer]: false})
  }
}

module.exports = actionGroups
