const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectToDB = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo');

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

// add cors middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}

// add session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: process.env.NODE_ENV == 'production',
    },
    store: MongoStore.create(mongoose.connection),
    resave: false,
    saveUninitialized: false,
  })
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

// add announcments routes
app.use('/api', require('./routes/announcements.routes'));
app.use('/api', require('./routes/users.routes'));
app.use('/auth', require('./routes/auth.routes'));

// add user routes

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});
