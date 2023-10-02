const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seed.js");
const data = require("../db/data/test-data");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("returns 200 status code", () => {
    return request(app).get("/api").expect(200);
  });
  test("returns correct message", () => {
    return request(app)
      .get("/api")
      .then(({ body }) => {
        expect(body.message).toBe("hello northcoders!");
      });
  });
});

describe("GET /api/snacks", () => {
  test("returns 200 status code", () => {
    return request(app).get("/api/snacks").expect(200);
  });
  test("returns an array of snack objects of the correct format", () => {
    return request(app)
      .get("/api/snacks")
      .then(({ body }) => {
        expect(body.snacks).toHaveLength(3);
        body.snacks.forEach((snack) => {
          expect(typeof snack.snack_id).toBe("number");
          expect(typeof snack.snack_name).toBe("string");
        });
      });
  });
  test("snack objects should be ordered by snack_name alphabetically by default", () => {
    return request(app)
      .get("/api/snacks")
      .then(({ body }) => {
        expect(body.snacks).toBeSortedBy("snack_name");
      });
  });
  test("sortby query allows for snacks to be sorted by price", () => {
    return request(app)
      .get("/api/snacks?sortby=price")
      .then(({ body }) => {
        expect(body.snacks).toBeSortedBy("price_in_pence");
      });
  });
  test("invalid sortby query responds with 400 and helpful message", () => {
    return request(app)
      .get("/api/snacks?sortby=invalid-sortby")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Invalid sort by query!!!!");
      });
  });
  test("maxprice query filters out snacks costing more than value ", () => {
    return request(app)
      .get("/api/snacks?maxprice=200")
      .then(({ body }) => {
        expect(body.snacks).toHaveLength(2);
        body.snacks.forEach((snack) => {
          expect(snack.price_in_pence).toBeLessThan(200);
        });
      });
  });
});

describe("GET /api/snacks/:snack_id", () => {
  test("responds with 200 status code", () => {
    return request(app).get("/api/snacks/3").expect(200);
  });
  test("responds with correct object", () => {
    return request(app)
      .get("/api/snacks/3")
      .then(({ body }) => {
        expect(body.snack.snack_id).toBe(3);
        expect(body.snack.snack_name).toBe("coffee");
        expect(body.snack.is_vegan).toBe(true);
        expect(body.snack.price_in_pence).toBe(300);
      });
  });
});

/*
POST a new snack 
201 - status code 
sever will respond with - The newly added snack
*/

describe("POST /api/snacks", () => {
  test("respond with a newly posted snack", () => {
    const newSnack = {
      snack_name: "Doritos - Red Hot",
      price_in_pence: 60,
      is_vegan: true,
    };

    return request(app)
      .post("/api/snacks")
      .send(newSnack)
      .expect(201)
      .then(({ body }) => {
        const { snack_id, snack_name, price_in_pence, is_vegan } = body.snack;
        expect(snack_id).toBe(4);
        expect(snack_name).toBe("Doritos - Red Hot");
        expect(price_in_pence).toBe(60);
        expect(is_vegan).toBe(true);
      });
  });
});
