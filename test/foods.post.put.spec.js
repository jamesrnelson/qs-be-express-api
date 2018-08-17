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

describe("Food POST and PUT endpoints", () => {
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

  describe("POST /api/v1/foods", () => {
    it("can add a food with all the required parameters", (done) => {
      chai.request(app)
      .post("/api/v1/foods")
      .send({
        food: { name: "Garbanzo Beans", calories: 300 }
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.id).to.eql(10);
        expect(res.body.name).to.eql("Garbanzo Beans");
        expect(res.body.calories).to.eql(300);
        done();
      });
    });

    it("sends a 400 status if name isn't supplied", (done) => {
      chai.request(app)
      .post("/api/v1/foods")
      .send({
        food: { calories: 300 }
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      })
    })

    it("sends a 400 status if calories aren't supplied", (done) => {
      chai.request(app)
      .post("/api/v1/foods")
      .send({
        food: { name: 'Chili cheesedog' }
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      })
    })
  });

  describe("PATCH /foods/:id", () => {
    it("can update a food if all parameters are supplied", (done) => {
      chai.request(app)
      .put("/api/v1/foods/1")
      .send({
        food: { name: "Pear", calories: 85 }
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.id).to.eql(1);
        expect(res.body.name).to.eql("Pear");
        expect(res.body.calories).to.eql(85);
        done();
      });
    });

    it("sends a 400 status if name isn't supplied", (done) => {
      chai.request(app)
      .put("/api/v1/foods/1")
      .send({
        food: { calories: 300 }
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
    });

    it("sends a 400 status if calories aren't supplied", (done) => {
      chai.request(app)
      .put("/api/v1/foods/1")
      .send({
        food: { name: 'Chili cheesedog' }
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
    });
  });

});
