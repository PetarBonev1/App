const cors = require('cors');
const express = require('express');
const session = require('express-session');
const { validateEmail } = require('./utils/validateEmail');

const users = [];

const app = express();

app.use(cors());
app.use(express.json());

// Configure session middleware
app.use(session({
   secret: 'your-secret-key', // Replace with a strong secret key
   resave: false,
   saveUninitialized: true,
   cookie: { secure: false } // Set to true if using HTTPS
}));

app.get('/numbers', (req, res) => {
   return res.status(200).json([1, 2, 3, 4, 5]);
});

app.post('/login', (req, res) => {
   const { mobileNumber, email } = req.body;

   try {
      if (mobileNumber.length !== 10) {
         throw new Error('Invalid mobile format!');
      }

      if (!validateEmail(email)) {
         throw new Error('Invalid email format!');
      }

      const confirmationCode = Date.now().toString().slice(0, 6);

      users.push({
         email,
         mobileNumber,
         confirmationCode,
      });

      req.session.email = email;
      req.session.mobileNumber = mobileNumber;
      req.session.isLoggedIn = true;

      console.log('Session data after login:', req.session); // Debugging line

      res.status(200).json({
         confirmationCode,
      });
   } catch (err) {
      res.status(400).json({
         errorMessage: err.message,
      });
   }
});

// Endpoint to get the current user based on session
app.get('/current-user', (req, res) => {
	console.log('Current session data: 2 ', req.session); // Debugging line 
   if (req.session.isLoggedIn) {
      console.log('Current session data:', req.session); // Debugging line
      return res.status(200).json({
         email: req.session.email,
         mobileNumber: req.session.mobileNumber,
      });
   } else {
      return res.status(401).json({
         message: 'User not logged in!',
      });
   }
});

app.listen(3000, () => {
   console.log('Server is listening on port 3000...');
});
