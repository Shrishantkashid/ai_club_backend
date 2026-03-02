const express = require('express');
const router = express.Router();
const TestQuizAttempt = require('../models/TestQuizAttempt');

// Submit test quiz results
router.post('/submit', async (req, res) => {
  try {
    const { email, score, totalQuestions, answers, warningCount, timestamp } = req.body;

    // Validate required fields
    if (!email || score === undefined || totalQuestions === undefined || !answers) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create new test quiz attempt
    const newAttempt = new TestQuizAttempt({
      email,
      score,
      totalQuestions,
      answers,
      warningCount: warningCount || 0,
      timestamp: timestamp || new Date()
    });

    await newAttempt.save();

    res.status(200).json({
      success: true,
      message: 'Test quiz submitted successfully',
      attemptId: newAttempt._id
    });
  } catch (error) {
    console.error('Error submitting test quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get test quiz leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const attempts = await TestQuizAttempt.find({})
      .sort({ score: -1, timestamp: 1 }) // Sort by highest score first, then by earliest submission
      .limit(50); // Limit to top 50 scores

    // Calculate rankings
    const leaderboard = attempts.map((attempt, index) => ({
      rank: index + 1,
      email: attempt.email,
      score: attempt.score,
      totalQuestions: attempt.totalQuestions,
      percentage: Math.round((attempt.score / attempt.totalQuestions) * 100),
      timestamp: attempt.timestamp,
      warningCount: attempt.warningCount
    }));

    res.status(200).json({
      success: true,
      leaderboard
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;