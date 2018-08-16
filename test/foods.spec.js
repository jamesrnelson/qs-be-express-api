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

describe("Food endpoints", () => {
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

    it("sends a 404 status if name isn't supplied", () => {
      chai.request(app)
      .post("/api/v1/foods")
      .send({
        food: { calories: 300 }
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
      })
    })

    it("sends a 404 status if calories aren't supplied", () => {
      chai.request(app)
      .post("/api/v1/foods")
      .send({
        food: { name: 'Chili cheesedog' }
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
      })
    })
  });

  describe("PATCH /foods/:id", () => {
    it("can update a food if all parameters are supplied", () => {
      chai.request(app)
      .patch("/api/v1/foods/1")
      .send({
        food: { name: "Pear", calories: 85 }
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.id).to.eql(1);
        expect(res.body.name).to.eql("Pear");
        expect(res.body.calories).to.eql(85);
      })
    })
  })
});
