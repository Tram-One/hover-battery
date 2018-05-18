const Hover = require('hover-engine')
const actions = require('./actions')
describe('hover-battery', () => {
  const battery = require('../../hover-battery')
  describe('with a plain javascript object', () => {
    let objectStorage
    let engine
    beforeEach(() => {
      objectStorage = {}
      engine = new Hover().addActions(actions)
    })
    it('should initalize the object with new default values', () => {
      objectStorage = {votes: '5', todos: '["write tests"]', timers: '{"email": true, "work": false, "break": true}'}
      engine.addActions(battery(objectStorage).actions)

      expect(engine.store.votes).toEqual(5)
      expect(engine.store.todos).toEqual(['write tests'])
      expect(engine.store.timers).toEqual({email: true, work: false, break: true})
    })
    it('should ignore default values that can\'t be parsed', () => {
      objectStorage = {votes: 'INFO', todos: 'undefined', timers: '{"email": true, "work": false, "break": true}'}
      engine.addActions(battery(objectStorage).actions)

      expect(engine.store.votes).toEqual(0)
      expect(engine.store.todos).toEqual([])
      expect(engine.store.timers).toEqual({email: true, work: false, break: true})
    })
    it('should write to the storage object', () => {
      engine.addListener(battery(objectStorage).listener)
      engine.actions.up()
      engine.actions.up()
      engine.actions.start('email')

      expect(JSON.parse(objectStorage.votes)).toEqual(2)
      expect(JSON.parse(objectStorage.timers).email).toEqual(true)
    })
    it('should not mutate the default state when using both actions and the listener', () => {
      engine.addActions(battery(objectStorage).actions)
      engine.addListener(battery(objectStorage).listener)

      expect(engine.store.votes).toEqual(0)
      expect(engine.store.todos).toEqual([])
      expect(engine.store.timers).toEqual({email: false, work: false, break: false})
    })
    it('should update both the engine and object on new actions', () => {
      engine.addActions(battery(objectStorage).actions)
      engine.addListener(battery(objectStorage).listener)

      engine.actions.down()
      engine.actions.addTodo('Check Test Values')
      engine.actions.start('work')

      expect(engine.store.votes).toEqual(-1)
      expect(JSON.parse(objectStorage.votes)).toEqual(-1)
      expect(engine.store.todos).toEqual(['Check Test Values'])
      expect(JSON.parse(objectStorage.todos)).toEqual(['Check Test Values'])
      expect(engine.store.timers).toEqual({email: false, work: true, break: false})
      expect(JSON.parse(objectStorage.timers)).toEqual({email: false, work: true, break: false})
    })
  })
})
