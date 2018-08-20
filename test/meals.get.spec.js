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

describe("Meal GET endpoints", () => {
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

  describe("GET /meals", () => {
    it("should return all meals with their associated foods", (done) => {
      chai.request(app)
      .get("/api/v1/meals")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.eql(4);
        expect(res.body[0].foods[0].name).to.eql("Banana");
        expect(res.body[0].foods[0].calories).to.eql(150);
        done();
      });
    });
  });

  describe("GET /meals/:id", () => {
    it("should return the specified meal with its associated foods", (done) => {
      chai.request(app)
      .get("/api/v1/meals/4")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.eql(1);
        expect(res.body[0].name).to.eql("Dinner");
        expect(res.body[0].foods).to.eql([]);
        done();
      });
    });
  });
});
