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

describe("Recipe Suggestions endpoint", () => {
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

  describe("GET api/v1/foods/:id/recipes", () => {
    it("returns recipe suggestions", (done) => {
      chai.request(app)
      .get("/api/v1/foods/1/recipes")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.eql(10);
        expect(res.body.recipes[0].name).to.eql('Basic Homemade Harissa')
        expect(res.body.recipes[0].url).to.eql('http://lh6.ggpht.com/3UN3uRTVkreHwZOWMZXnrodDQZlhUMBixstFEtlFRYTiwgzIk1D9Eu6IQWyP_NrnhkKU0f67uVA57VIygO-4=s90')
        done();
      });
    });
  });
});
