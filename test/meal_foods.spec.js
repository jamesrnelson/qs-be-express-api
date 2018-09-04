const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;
const pry = require('pryjs');
const app = require('../app');

chai.use(chaiHttp);

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const knex = require('knex')(configuration);

describe("Meal_Foods endpoints", () => {
  beforeEach((done) => {
    knex.migrate.latest()
      .then(() => {
        knex.seed.run()
          .then(() => {
            done();
          });
      });
  });

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });

  describe("POST /meals/:meal_id/foods/:id", () => {
    it("should be able to create meal_foods", (done) => {
      chai.request(app)
      .post("/api/v1/meals/4/foods/9")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
    });
  });

  describe("DELETE /meals/:meal_id/foods/:id", () => {
    it("should be able to delete meal_foods", (done) => {
      chai.request(app)
      .delete("/api/v1/meals/1/foods/1")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201)
        done();
      });
    });
  });

});
