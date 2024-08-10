import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  // userId: {
  //   type: String,
  //   required: false,
  // },
  city: {
    type: String,
    default: "Somewhere",
    required: false,
  },
  from: {
    type: Date,
    required: false,
  },
  to: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.models.City || mongoose.model("City", citySchema);
