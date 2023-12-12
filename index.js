const express = require("express");
const session = require('express-session');
const uuid = require('uuid');
const cors = require('cors');


const app = express();
const PORT = 3001;
app.use(cors());
app.use(session({
  genid: () => uuid.v4(), // Generate a unique worker ID for each session
  secret: 'your_secret_key',
  resave: true,
  saveUninitialized: true,
})
);


function validateToken(token) {
  return true;
}

function checkWork(work) {
  return true;
}


app.post('/', (req, res) => {
  const workerId = req.sessionID; // Get the unique worker ID from the session
  res.json({ success: true, message: 'Login successful', workerId });
});

// API endpoint for checking if a user is logged in
app.get('/', (req, res) => {
  const loggedIn = req.session.user ? true : false;
  res.json({ loggedIn, workerId: req.sessionID });
});

// API endpoint for user logout
app.post('/', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logout successful' });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
