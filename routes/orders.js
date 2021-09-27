const express = require("express");
const router = express.Router();
const { Order, validateOrder } = require("../models/orders");
const { getCurrentDate } = require("../util");

/* Get all orders */
router.get("/", async (req, res) => {
  const orders = await Order.find();
  if (orders && !orders.length) return res.status(404).send("No orders found");
  res.send(orders);
});

/* Get all orders from the last day */
router.get("/lastday", async (req, res) => {
  const lastdayOrders = await Order.find({ date: getCurrentDate() });
  if (lastdayOrders && !lastdayOrders.length)
    return res.status(404).send("No orders found");
  res.send(lastdayOrders);
});

/* Save new order */
router.post("/", async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let order = new Order({
    orderSummary: req.body.orderSummary,
    address: {
      city: req.body.address.city,
      street: req.body.address.street,
      houseNumber: req.body.address.houseNumber,
      apartmentNumber: req.body.address.apartmentNumber,
      floor: req.body.address.floor,
      entrance: req.body.address.entrance,
      comments: req.body.address.comments,
    },
    coustomerDatails: {
      firstName: req.body.coustomerDatails.firstName,
      lastName: req.body.coustomerDatails.lastName,
      phoneNumber: req.body.coustomerDatails.phoneNumber,
      anotherPhone: req.body.coustomerDatails.anotherPhone,
      email: req.body.coustomerDatails.email,
      numberOfDiners: req.body.coustomerDatails.numberOfDiners,
    },
    payment: {
      subTotal: req.body.payment.subTotal,
      creditCard: req.body.payment.creditCard,
      cardValidity: {
        year: req.body.payment.cardValidity.year,
        month: req.body.payment.cardValidity.month,
      },
      id: req.body.payment.id,
      cvv: req.body.payment.cvv,
      numberOfPayments: req.body.payment.numberOfPayments,
    },
    total: req.body.total,
    discount: req.body.discount,
    tax: req.body.tax,
  });
  order = await order.save();
  res.send(order);
});

module.exports = router;
