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

describe("Food get endpoints", () => {
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

  describe("GET /api/v1/foods", () => {
    it("returns all foods in the database", (done) => {
      chai.request(app)
      .get("/api/v1/foods")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.eql(9);
        expect(res.body[0].name).to.eql("Banana");
        expect(res.body[0].calories).to.eql(150);
        done();
      });
    });
  });

  describe("GET /api/v1/foods/:id", () => {
    it("returns the specified food from the database", (done) => {
      chai.request(app)
      .get("/api/v1/foods/1")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.id).to.eql(1);
        expect(res.body.name).to.eql("Banana");
        expect(res.body.calories).to.eql(150);
        done();
      })
    })

    it("returns a 404 if a nonexistent food id is requested", (done) => {
      chai.request(app)
      .get("/api/v1/foods/1000000")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
    });
  });
});
