require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smart-grading', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// User model
const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], required: true },
});
const User = mongoose.model('User', userSchema);

// Test API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is connected!' });
});

// Register route
app.post('/api/register', async (req, res) => {
  const { username, email, password, confirmPassword, role } = req.body;
  if (!username || !email || !password || !confirmPassword || !role) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered.' });
    }
    const user = new User({ username, email, password, role });
    await user.save();
    res.json({ message: 'Registration successful.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(400).json({ error: 'Email not registered for this role.' });
    }
    if (user.password !== password) {
      return res.status(400).json({ error: 'Incorrect password.' });
    }
    res.json({ message: 'Login successful.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
