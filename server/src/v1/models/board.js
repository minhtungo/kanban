const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { schemaOptions } = require('./modelOptions');

const boardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    icon: {
      type: String,
      default: '📝',
    },
    title: {
      type: String,
      default: 'Untitled',
    },
    description: {
      type: String,
      default: `Add description here`,
    },
    position: {
      type: Number,
    },
    starred: {
      type: Boolean,
      default: false,
    },
    starredPosition: {
      type: Number,
      default: 0,
    },
  },
  schemaOptions
);

module.exports = mongoose.model('Board', boardSchema);
