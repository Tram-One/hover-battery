const Nightmare = require('nightmare')
const budo = require('budo')

// jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999 // use for debugging in nightmare

const failTest = (fail, done) => (err) => {
  console.error('Test Failed', err)
  fail()
  done()
}

describe('hover-battery', () => {
  describe('with sessionStorage', () => {
    let nightmare
    const uri = 'http://localhost:8000'
    beforeAll((done) => {
      budo('./tests/specs/index.js', {port: 8000})
        .on('connect', (ev) => {
          console.log('Server running on %s', ev.uri)
          done()
        })
    })

    beforeEach(() => {
      nightmare = new Nightmare({
        // show: true,
        // openDevTools: true
      })
    })

    it('should persist on page refresh', (done) => {
      nightmare
        .goto(uri)
        .click('#up')
        .refresh()
        .evaluate(() => {
          return {
            engine: window.engine.store.votes,
            storage: JSON.parse(sessionStorage.getItem('votes'))
          }
        })
        .end()
        .then((result) => {
          expect(result.engine).toEqual(1)
          expect(result.storage).toEqual(1)
          done()
        })
        .catch(failTest(fail, done))
    })

    it('should handle nested objects', (done) => {
      nightmare
        .goto(uri)
        .click('#start')
        .refresh()
        .evaluate(() => {
          return {
            engine: window.engine.store.timers.work,
            storage: JSON.parse(sessionStorage.getItem('timers')).work
          }
        })
        .end()
        .then((result) => {
          expect(result.engine).toEqual(true)
          expect(result.storage).toEqual(true)
          done()
        })
        .catch(failTest(fail, done))
    })
  })
})
