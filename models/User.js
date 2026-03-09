const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  full_name: {
    type: String,
    required: function() {
      // Only require for non-admin users
      return this.email !== 'admin@gmail.com';
    }
  },
  semester: {
    type: Number,
    required: function() {
      // Only require for non-admin users
      return this.email !== 'admin@gmail.com';
    },
    min: 1,
    max: 8
  },
  password: {
    type: String,
    required: function() {
      // Only require for non-admin users
      return this.email !== 'admin@gmail.com';
    }
  },
  status: {
    type: String,
    default: 'ACTIVE'
  },
  reset_count: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);