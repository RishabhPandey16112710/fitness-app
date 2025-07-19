const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userRoutes = require('./routes/user');
const roadmapRoutes = require('./routes/roadmap');

app.use('/api/user', userRoutes);
app.use('/api/roadmap', roadmapRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
