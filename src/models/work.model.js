const { Schema, model } = require('mongoose');

const workSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title not undefined'],
    },
  },
  { timestamps: true },
);

const Work = model('Work', workSchema);

module.exports = Work;
