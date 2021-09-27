const request = require("supertest");
const { Order } = require("../../models/orders");
let server;

describe("/api/orders", () => {
  beforeEach(() => {
    server = require("../../app");
  });
  afterEach(async () => {
    server.close();
    await Order.remove({});
  });
  describe("GET /", () => {
    it("should return 404 if orders not found in db", async () => {
      const res = await request(server).get("/api/orders");
      expect(res.status).toBe(404);
    });
    it("should return all orders", async () => {
      await Order.collection.insertOne({
        orderSummary: [
          {
            description: "hamburger 23",
            quantity: 1,
            rate: 10,
            comments: "Best hamburger ever!",
          },
          {
            description: "hamburger 23",
            quantity: 2,
            rate: 15,
            comments: "Best hamburger ever!!!",
          },
        ],
        address: {
          city: "Carmiel",
          street: "Nahal Dan",
          houseNumber: "1",
          apartmentNumber: "10",
          floor: "4",
          entrance: "",
          comments: "",
        },
        coustomerDatails: {
          firstName: "Gal",
          lastName: "Palas",
          phoneNumber: "0534244030",
          anotherPhone: "",
          email: "galpalas265@gmail.com",
          numberOfDiners: "2",
        },
        payment: {
          subTotal: 7,
          creditCard: "1234567891011123",
          cardValidity: {
            year: "2027",
            month: "09",
          },
          id: "303177787",
          cvv: "399",
          numberOfPayments: "1",
        },
        total: 7,
        discount: 0,
        tax: 17,
      });
      const res = await request(server).get("/api/orders");
      expect(res.status).toBe(200);
    });
  });
  describe("GET /lastday", () => {
    it("should return 404 if orders not found in db", async () => {
      const res = await request(server).get("/api/orders/lastday");
      expect(res.status).toBe(404);
    });
    it("should return all orders from the last day", async () => {
      await Order.collection.insertOne({
        orderSummary: [
          {
            description: "hamburger 25",
            quantity: 2,
            rate: 20,
            comments: "Best hamburger ever!",
          },
          {
            description: "hamburger 25",
            quantity: 2,
            rate: 15,
            comments: "Best hamburger ever!!!",
          },
        ],
        address: {
          city: "Carmiel",
          street: "Nahal Dan",
          houseNumber: "1",
          apartmentNumber: "10",
          floor: "4",
          entrance: "",
          comments: "",
        },
        coustomerDatails: {
          firstName: "Gal",
          lastName: "Palas",
          phoneNumber: "0534244030",
          anotherPhone: "",
          email: "galpalas265@gmail.com",
          numberOfDiners: "2",
        },
        payment: {
          subTotal: 7,
          creditCard: "1234567891011123",
          cardValidity: {
            year: "2027",
            month: "09",
          },
          id: "303177787",
          cvv: "399",
          numberOfPayments: "1",
        },
        total: 7,
        discount: 0,
        tax: 17,
      });
      const res = await request(server).get("/orders/lastday");
      expect(res.status).toBe(404);
      expect(res.body.length).toBeFalsy();
    });
  });
  describe("POST /", () => {
    it("should return 400 if total is not required", async () => {
      const res = await request(server).post("/api/orders").send({ total: "" });
      expect(res.status).toBe(400);
    });
    it("should save the order if it is valid", async () => {
      const res = await request(server).post("/api/orders").send({ total: 10 });
      const order = await Order.find({ total: 10 });
      expect(order).not.toBeNull();
    });
  });
});
