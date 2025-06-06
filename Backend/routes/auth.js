const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'auxicordoapp';
var fetchuser = require('../middleware/fetchuser');
// ROUTE 1 Create a User using: POST "/api/auth". Doesn't require Auth(login)
router.post(
  '/createuser',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already    
    //try {
     // let user = await User.findOne({ email: req.body.email });

    try {
      // Generate salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create new user with hashed password
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // Save the user to the database
      await user.save();

      // Create JWT payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign and generate JWT token
      const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ message: 'User registered successfully', authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);





// ROUTE 2 Authenticate a User using: POST "/api/auth/login". Require Auth 
router.post(
    '/login',
    [
      body('email', 'Enter a valid email').isEmail(),
      body('password', 'Password cannot be blank').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
          let user = await 
            User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Please try to login with correct credentials' });
                }
                const passwordCompare = await bcrypt.compare(password, user.password);
                if (!passwordCompare) {
                    return res.status(400).json({ error: 'Please try to login with correct credentials' });
                }
                const payload = {
                    user: {
                      id: user.id,
                    },
                  };
            
                  // Sign and generate JWT token
                  const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
                  res.json({ authToken });
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
}
)
//ROUTE 3 Get loggedin User details using: POST "/api/auth/getuser". Require Auth
router.post(
    '/getuser', fetchuser,
    async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
          } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
          }
    }
)


module.exports = router;

