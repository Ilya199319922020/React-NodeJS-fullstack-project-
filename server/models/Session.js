const mongoose = require('mongoose');
const connection = require('../libs/connection');

const schema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  lastVisit: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

schema.path('lastVisit').index({ expires: '30m' });

module.exports = connection.model('Session', schema);
