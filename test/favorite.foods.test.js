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

describe("Favorite Foods endpoint", () => {
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

  describe("GET /api/v1/favorite_foods", () => {
    it("returns times eaten with the foods that have been eaten that many times", (done) => {
      chai.request(app)
      .get("/api/v1/favorite_foods")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.eql(3);
        expect(res.body[0].timesEaten).to.eql('3');
        expect(res.body[0].foods.length).to.eql(1);
        expect(res.body[0].foods[0].name).to.eql("Banana");
        expect(res.body[0].foods[0].calories).to.eql(150);
        expect(res.body[1].timesEaten).to.eql('2');
        expect(res.body[1].foods.length).to.eql(3);
        expect(res.body[2].timesEaten).to.eql('1');
        expect(res.body[2].foods.length).to.eql(1);
        done();
      });
    });
  });


});
