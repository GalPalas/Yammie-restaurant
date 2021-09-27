const mongoose = require("mongoose");

const dishesSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxLength: 255,
    },
    quantity: { type: Number, required: true, min: 1 },
    rate: { type: Number, required: true },
    comments: String,
  },
  { _id: false }
);

const Dishes = mongoose.model("Dishes", dishesSchema);

exports.dishesSchema = dishesSchema;
exports.Dishes = Dishes;
