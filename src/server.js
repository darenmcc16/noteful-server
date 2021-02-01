const app = require('./app')
const {PORT} = require('./config')
const {expect} = require('chai')
const supertest = require('supertest')



module.exports = app



app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

describe('App', () => {
    it('GET / responds with 200 containing "Hello, world!"', () => {
      return supertest(app)
        .get('/')
        .expect(200, 'Hello, world!')
    })
  })