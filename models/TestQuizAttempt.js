const mongoose = require('mongoose');

const testQuizAttemptSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  answers: {
    type: Map,
    of: Number, // Maps question ID to selected answer index
    required: true
  },
  warningCount: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  completionTime: {
    type: Number, // Time taken to complete the quiz in milliseconds
    default: 0
  }
});

module.exports = mongoose.model('TestQuizAttempt', testQuizAttemptSchema);