const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    tags: [String],
    img: String,
    collaborate: Boolean,
    seeking: [String],
    comment: [],
    like: Boolean,
    numberOfLikes: Number
  },
  {
    timestamps: true
  }
)

const Art = mongoose.model('Art', artSchema)
module.exports = Art