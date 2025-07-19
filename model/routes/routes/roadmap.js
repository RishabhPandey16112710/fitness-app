const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createRoadmap = (goal, timeline, experience) => {
  let roadmap = [];
  if (goal === 'weight-loss') {
    for (let i = 1; i <= timeline; i++) {
      roadmap.push({ week: i, activity: i === 1 ? '30-min walks' : 'Increase intensity' });
    }
  }
  return roadmap;
};

router.post('/setup', async (req, res) => {
  const { token, goal, timeline, experience } = req.body;
  const userId = jwt.verify(token, process.env.JWT_SECRET).userId;
  const roadmap = createRoadmap(goal, timeline, experience);
  await User.findByIdAndUpdate(userId, { goals: { goal, timeline, experience }, roadmap });
  res.json({ roadmap });
});

router.get('/progress', async (req, res) => {
  const userId = jwt.verify(req.headers['authorization'], process.env.JWT_SECRET).userId;
  const user = await User.findById(userId);
  res.json({ roadmap: user.roadmap });
});

module.exports = router;
