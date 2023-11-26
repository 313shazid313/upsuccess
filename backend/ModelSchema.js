const mongoose = require ('mongoose')
const cardSchema = new mongoose.Schema(
  {
    image: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const productInfo = mongoose.model("productInfo",cardSchema)
module.exports = productInfo;