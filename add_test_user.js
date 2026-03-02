const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Add test user
const addTestUser = async (email) => {
  await connectDB();
  
  try {
    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    if (existingUser) {
      console.log(`✅ User ${email} already exists`);
      console.log('User ID:', existingUser._id);
      console.log('Status:', existingUser.status);
    } else {
      // Create new user
      const user = await User.create({
        email: email.toLowerCase(),
        status: 'ACTIVE',
        reset_count: 0
      });
      
      console.log(`✅ User ${email} created successfully`);
      console.log('User ID:', user._id);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Get email from command line or use default test email
const testEmail = process.argv[2] || 'testuser@saividya.ac.in';
addTestUser(testEmail);
