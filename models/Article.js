const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: "String",
    required: true,
    minLength: 1
  },
  content: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

module.exports = mongoose.model('Article', articleSchema);