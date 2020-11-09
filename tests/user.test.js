const request = require("supertest");
const app = require("../index");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

afterAll((done) => {
  queryInterface
    .bulkDelete("Users")
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
});

describe("Test POST /register", () => {
  it("Test register success", async (done) => {
    request(app)
      .post("/register")
      .send({
        email: "sample@sample.com",
        password: "test1234",
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("email", "sample@sample.com");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it("Test register email already registered", async (done) => {
    request(app)
      .post("/register")
      .send({
        email: "sample@sample.com",
        password: "test1234",
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email already registered");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it("Test register failed email", async (done) => {
    request(app)
      .post("/register")
      .send({
        email: "sample",
        password: "test1234",
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty(
          "message",
          "Please input the correct email"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it("Test register failed password", async (done) => {
    request(app)
      .post("/register")
      .send({
        email: "sample@sample.com",
        password: "test",
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty(
          "message",
          "Password must contain at least 8 characters and less then 13 characters"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

describe("Test POST /login", () => {
  it("Test login success", async (done) => {
    request(app)
      .post("/login")
      .send({
        email: "sample@sample.com",
        password: "test1234",
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it("Test login wrong email", async (done) => {
    request(app)
      .post("/login")
      .send({
        email: "sample",
        password: "test1234",
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Invalid email/password");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it("Test login wrong password", async (done) => {
    request(app)
      .post("/login")
      .send({
        email: "sample@sample.com",
        password: "test",
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Invalid email/password");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
});
