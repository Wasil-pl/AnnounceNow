const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectToDB = require('./db');

// start express server
const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

// connect to DB
connectToDB();

// add middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Serve static files from the React app

// add announcments routes
app.use('/api', require('./routes/announcements.routes'));
app.use('/api', require('./routes/users.routes'));
app.use('/auth', require('./routes/auth.routes'));

// add user routes

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});
