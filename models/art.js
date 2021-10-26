const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artSchema = new Schema(
  {
    post_user: {type: String},
    title: { type: String },
    description: { type: String },
    tags: [String],
    img: String,
    collaborate: Boolean,
    seeking: [String],
    comments: [
      {
        comment: [String],
        sender: String
      }
    ],
    like: Boolean,
    numberOfLikes: Number
  },

  {
    timestamps: true
  }
)

const Art = mongoose.model('Art', artSchema)
module.exports = Art