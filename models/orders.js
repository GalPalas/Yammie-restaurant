const Joi = require("joi");
const mongoose = require("mongoose");
const { dishesSchema } = require("./dishes");
const { getCurrentDate } = require("../util");

const orderSchema = new mongoose.Schema(
  {
    orderSummary: [dishesSchema],
    address: {
      city: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 50,
      },
      street: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 50,
      },
      houseNumber: {
        type: String,
        required: true,
      },
      apartmentNumber: {
        type: String,
        required: true,
      },
      floor: {
        type: String,
        required: true,
      },
      entrance: String,
      comments: String,
    },
    coustomerDatails: {
      firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxLength: 50,
      },
      lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxLength: 50,
      },
      phoneNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxLength: 10,
      },
      anotherPhone: String,
      email: String,
      numberOfDiners: String,
    },
    payment: {
      subTotal: {
        type: Number,
        required: true,
      },
      creditCard: {
        type: String,
        required: true,
        minlength: 16,
        maxLength: 16,
        set: (v) => v.replace(/\d(?=\d{4})/g, "*"),
      },
      cardValidity: {
        year: {
          type: String,
          required: true,
          minlength: 4,
          maxLength: 4,
        },
        month: {
          type: String,
          required: true,
          minlength: 2,
          maxLength: 2,
        },
      },
      id: {
        type: String,
        required: true,
        minlength: 9,
        maxLength: 9,
      },
      cvv: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 3,
      },
      numberOfPayments: String,
    },
    total: { type: Number, required: true },
    discount: Number,
    tax: { type: Number, required: true },
    date: { type: String, default: getCurrentDate() },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = {
    orderSummary: Joi.array().items({
      description: Joi.string().min(5).max(255).required(),
      quantity: Joi.number().min(1).required(),
      rate: Joi.number().required(),
      comments: Joi.string().empty("").default(""),
    }),
    address: {
      city: Joi.string().min(5).max(50).required(),
      street: Joi.string().min(5).max(50).required(),
      houseNumber: Joi.string().required(),
      apartmentNumber: Joi.string().required(),
      floor: Joi.string().required(),
      entrance: Joi.string().empty("").default(""),
      comments: Joi.string().empty("").default(""),
    },
    coustomerDatails: {
      firstName: Joi.string().min(2).max(50).required(),
      lastName: Joi.string().min(2).max(50).required(),
      phoneNumber: Joi.string().min(10).max(10).required(),
      anotherPhone: Joi.string().empty("").default(""),
      email: Joi.string().empty("").default(""),
      numberOfDiners: Joi.string().empty("").default(""),
    },
    payment: {
      subTotal: Joi.number().required(),
      creditCard: Joi.string().min(16).max(16).required(),
      cardValidity: {
        year: Joi.string().min(4).max(4).required(),
        month: Joi.string().min(2).max(2).required(),
      },
      id: Joi.string().min(9).max(9).required(),
      cvv: Joi.string().min(3).max(3).required(),
      numberOfPayments: Joi.string().empty("").default(""),
    },
    total: Joi.number().required(),
    discount: Joi.number(),
    tax: Joi.number().required(),
  };

  return Joi.validate(order, schema);
}

exports.orderSchema = orderSchema;
exports.Order = Order;
exports.validateOrder = validateOrder;
