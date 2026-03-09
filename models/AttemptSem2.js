const mongoose = require('mongoose');

const attemptSem2Schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Round 1 - Detailed answers
  round1_answers: [{ 
    questionId: String, 
    selectedAnswer: Number,
    isCorrect: Boolean,
    timestamp: { type: Date, default: Date.now }
  }],
  round1_score: {
    type: Number,
    default: 0
  },
  round1_start_time: {
    type: Date
  },
  round1_end_time: {
    type: Date
  },
  
  // Round 2 - Activity completion
  round2_activities_completed: [{
    activityName: String,
    moves: Number,
    timeTaken: Number,
    completed: Boolean,
    timestamp: { type: Date, default: Date.now }
  }],
  round2_score: {
    type: Number,
    default: 0
  },
  round2_start_time: {
    type: Date
  },
  round2_end_time: {
    type: Date
  },
  
  // Round 3 - Task answers
  round3_task_answers: [{
    taskType: String, // debug, decode, logic, pattern
    taskNumber: Number,
    userAnswer: String,
    isCorrect: Boolean,
    timestamp: { type: Date, default: Date.now }
  }],
  round3_riddle_answers: [{
    riddleQuestion: String,
    userAnswer: String,
    isCorrect: Boolean,
    keyLetter: String,
    timestamp: { type: Date, default: Date.now }
  }],
  round3_score: {
    type: Number,
    default: 0
  },
  round3_start_time: {
    type: Date
  },
  round3_end_time: {
    type: Date
  },
  
  // Overall metrics
  contest_start_time: {
    type: Date
  },
  contest_end_time: {
    type: Date
  },
  total_time_seconds: {
    type: Number,
    default: 0
  },
  total_points: {
    type: Number,
    default: 0
  },
  accuracy: {
    type: Number,
    default: 0
  },
  is_disqualified: {
    type: Boolean,
    default: false
  },
  warning_count: {
    type: Number,
    default: 0
  },
  submitted_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AttemptSem2', attemptSem2Schema);
