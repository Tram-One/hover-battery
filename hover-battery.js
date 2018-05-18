
// helper function - parses if we can, otherwise, return undefined
const safeParse = (value) => {
  try {
    return JSON.parse(value)
  } catch (error) {
    console.warn(`hover-battery could not parse ${value}`)
  }
}

// helper function - builds a single init action group
const buildInitAction = (storeName, initValue) => {
  if (initValue) return {[storeName]: {init: () => initValue}}
  return {}
}

// helper function - adds all the init actions for each store
const addInitActions = (storage) => (memory, key) => {
  const value = (storage.getItem === undefined) ? storage[key] : storage.getItem(key)
  return Object.assign({}, memory, buildInitAction(key, safeParse(value)))
}

/**
 * hover-battery
 * package to write-to and load from a sessionStorage or localStorage
 * preserving your state across page loads
 * @param {Object} storage - Object to write and read from
 */
module.exports = (storage) => ({

  /**
   * hover-battery.listener
   * - writes the values in store to storage
   * - should be passed into addListeners
   */
  listener: (store) => {
    Object.keys(store).forEach((key) => {
      if (storage.setItem === undefined) {
        storage[key] = JSON.stringify(store[key])
      } else {
        storage.setItem(key, JSON.stringify(store[key]))
      }
    })
  },

  /**
   * hover-battery.actions
   * - re-assigns the init function for each store
   * - should be passed into addActions (after all other addActions)
   */
  actions: Object.keys(storage).reduce(addInitActions(storage), {})
})
