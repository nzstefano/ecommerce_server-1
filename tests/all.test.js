const request = require("supertest");
const app = require("../index");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

let admin_token = "";
let customer_token = "";
let productId = 0;

afterAll((done) => {
  queryInterface
    .bulkDelete("Users")
    .then(() => {
      return queryInterface.bulkDelete("Products");
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });
});

describe("Test POST /register", () => {
  it("Test register customer success", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "sample@mail.com",
        password: "test1234",
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("email", "sample@mail.com");
        expect(body).toHaveProperty("role", "Customer");
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test register admin success", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "admin@mail.com",
        password: "admin123",
        role: "Admin",
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("email", "admin@mail.com");
        expect(body).toHaveProperty("role", "Admin");
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test register email already registered", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "sample@mail.com",
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
        done(err);
      });
  });

  it("Test register failed email", (done) => {
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
        done(err);
      });
  });

  it("Test register failed password", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "sample@mail.com",
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
        done(err);
      });
  });
});

describe("Test POST /login", () => {
  it("Test login admin success", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "admin@mail.com",
        password: "admin123",
      })
      .then((response) => {
        let { body, status } = response;
        admin_token = body.access_token;
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", admin_token);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test login admin success", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "sample@mail.com",
        password: "test1234",
      })
      .then((response) => {
        let { body, status } = response;
        customer_token = body.access_token;
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", customer_token);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test login wrong email", (done) => {
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
        done(err);
      });
  });

  it("Test login wrong password", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "sample@mail.com",
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
        done(err);
      });
  });
});

describe("Test POST /products", () => {
  it("Test Add Product success", (done) => {
    request(app)
      .post("/products")
      .set("access_token", admin_token)
      .send({
        name: "Zeki",
        image_url:
          "https://ecs7.tokopedia.net/img/cache/200-square/product-1/2019/11/23/3473756/3473756_48a8b1ec-29b7-457a-bf00-394300d8381d_598_598.jpg",
        price: 2000,
        stock: 50,
      })
      .then((response) => {
        let { body, status } = response;
        productId = body.product.id;
        expect(status).toBe(201);
        expect(body.product).toHaveProperty("name", "Zeki");
        expect(body.product).toHaveProperty(
          "image_url",
          "https://ecs7.tokopedia.net/img/cache/200-square/product-1/2019/11/23/3473756/3473756_48a8b1ec-29b7-457a-bf00-394300d8381d_598_598.jpg"
        );
        expect(body.product).toHaveProperty("price", 2000);
        expect(body.product).toHaveProperty("stock", 50);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test Add Product Authentication fail", (done) => {
    request(app)
      .post("/products")
      .send({
        name: "Zeki",
        image_url:
          "https://ecs7.tokopedia.net/img/cache/200-square/product-1/2019/11/23/3473756/3473756_48a8b1ec-29b7-457a-bf00-394300d8381d_598_598.jpg",
        price: 2000,
        stock: 50,
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Authentication failed");
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test Add Product Authorization fail", (done) => {
    request(app)
      .post("/products")
      .set("access_token", customer_token)
      .send({
        name: "Zeki",
        image_url:
          "https://ecs7.tokopedia.net/img/cache/200-square/product-1/2019/11/23/3473756/3473756_48a8b1ec-29b7-457a-bf00-394300d8381d_598_598.jpg",
        price: 2000,
        stock: 50,
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Authorization failed");
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test Add Product failed name is null", (done) => {
    request(app)
      .post("/products")
      .set("access_token", admin_token)
      .send({
        name: null,
        image_url:
          "https://ecs7.tokopedia.net/img/cache/200-square/product-1/2019/11/23/3473756/3473756_48a8b1ec-29b7-457a-bf00-394300d8381d_598_598.jpg",
        price: 2000,
        stock: 50,
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", `Please input the product name`);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test Add Product failed image is null", (done) => {
    request(app)
      .post("/products")
      .set("access_token", admin_token)
      .send({
        name: "Zeki",
        image_url: null,
        price: 2000,
        stock: 50,
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty(
          "message",
          `Please input the product image link`
        );
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test Add Product failed invalid price", (done) => {
    request(app)
      .post("/products")
      .set("access_token", admin_token)
      .send({
        name: "Zeki",
        image_url:
          "https://ecs7.tokopedia.net/img/cache/200-square/product-1/2019/11/23/3473756/3473756_48a8b1ec-29b7-457a-bf00-394300d8381d_598_598.jpg",
        price: 0,
        stock: 50,
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", `Invalid price`);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test Add Product failed invalid stock", (done) => {
    request(app)
      .post("/products")
      .set("access_token", admin_token)
      .send({
        name: "Zeki",
        image_url:
          "https://ecs7.tokopedia.net/img/cache/200-square/product-1/2019/11/23/3473756/3473756_48a8b1ec-29b7-457a-bf00-394300d8381d_598_598.jpg",
        price: 3000,
        stock: 0,
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", `Invalid stock`);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("Test PUT /products", () => {
  it("Test Edit Product success", (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set("access_token", admin_token)
      .send({
        name: "Komo",
        image_url:
          "https://id-test-11.slatic.net/p/b738d9447e866fd95434d5f205a370d8.jpg",
        price: 1000,
        stock: 20,
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(200);
        expect(body.product).toHaveProperty("name", "Komo");
        expect(body.product).toHaveProperty(
          "image_url",
          "https://id-test-11.slatic.net/p/b738d9447e866fd95434d5f205a370d8.jpg"
        );
        expect(body.product).toHaveProperty("price", 1000);
        expect(body.product).toHaveProperty("stock", 20);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test Edit Product Authentication fail", (done) => {
    request(app)
      .put(`/products/${productId}`)
      .send({
        name: "Komo",
        image_url:
          "https://id-test-11.slatic.net/p/b738d9447e866fd95434d5f205a370d8.jpg",
        price: 1000,
        stock: 20,
      })
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Authentication failed");
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("Test DELETE /products", () => {
  it("Test Delete Product success", (done) => {
    request(app)
      .delete(`/products/${productId}`)
      .set("access_token", admin_token)
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty(
          "message",
          "Product Komo succesfully deleted"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test Edit Product Authorization fail", (done) => {
    request(app)
      .delete(`/products/${productId}`)
      .set("access_token", customer_token)
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Authorization failed");
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("Test GET /products", () => {
  it("Test Show Product success", (done) => {
    request(app)
      .get("/products")
      .then((response) => {
        let { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("product", expect.anything());
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});
