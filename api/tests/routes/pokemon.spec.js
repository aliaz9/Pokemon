const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  describe('GET /pokemon', () => {
    it('should get 200', (done) => {
      agent.get('/pokemon').expect(200)
      done();
  })
})

  describe('GET /tipos', () => {
    it('responds with 200', (done) =>{
      agent.get('/tipos').expect(200);
      done()
    })
  })

});
