const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync());
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'pikachu' });
      });
    });
  });

  describe("Stats", () => {
    it("Hp tiene que ser un número.", (done) => {
      Pokemon.create({ name: "pikachu", hp: "asd" })
        .then(() => done(new Error("HP no es un número")))
        .catch(() => done());
    });

    it("Attack tiene que ser un número.", (done) => {
      Pokemon.create({ name: "pikachu", attack: "asd" })
        .then(() => done(new Error("Fuerza no es un número")))
        .catch(() => done());
    });

    it("Defense tiene que ser un número.", (done) => {
      Pokemon.create({ name: "pikachu", defense: "asd" })
        .then(() => done(new Error("Defensa no es un número")))
        .catch(() => done());
    });

    it("Speed tiene que ser un número.", (done) => {
      Pokemon.create({ name: "pikachu", speed: "asd" })
        .then(() => done(new Error("Velocidad no es un número")))
        .catch(() => done());
    });

    it("Height tiene que ser un número.", (done) => {
      Pokemon.create({ name: "pikachu", height: "asd" })
        .then(() => done(new Error("Height no es un número")))
        .catch(() => done());
    });

    it("Weight tiene que ser un número.", (done) => {
      Pokemon.create({ name: "Pikachu", weight: "asd" })
        .then(() => done(new Error("Weight no es un número")))
        .catch(() => done());
    });
  })


});
