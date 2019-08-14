const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');
require('../config/passport')(passport)

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validateUpdateInput = require('../validation/update');
const validateChangePasswordInput = require('../validation/change-password');

// Load User model
const User = require('../models/user');


// @route   POST users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Podany adres email istnieje już w bazie';
      return res.status(400).json(errors);
    } else {

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'Użytkownik nie znaleziony';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, email: user.email, role: user.role }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Hasło jest niepoprawne';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET users/all
// @desc    Return all users
// @access  Private
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.getUsers((err, failures) => {
    if(err) throw err;
    res.json(failures);
  });
});

module.exports = router;

// @route   GET users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// @route   GET users/:id
// @desc    get user by id
// @access  Private
router.get('/:id',  passport.authenticate('jwt', { session: false }), (req, res, next) => {
  User.getUserById(req.params.id, (err, user) => {
      if(err) throw err;
      res.json(user);
  });
});

// @route   PUT users/:id
// @desc    Update user by id
// @access  Private
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  if(req.body.hasOwnProperty('password')){
    const { errors, isValid } = validateChangePasswordInput(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // retrieve the password field
    let password = req.body.password

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        req.body.password = hash

        User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
          if(err) throw err;
          res.json(user);
        }); 
      });
    });

  } else {
    const { errors, isValid } = validateUpdateInput(req.body);
    
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const updatedUser = new User({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    });

          console.log(updatedUser);
    User.updateUser(req.params.id, updatedUser, (err, user) => {
      if(err) throw err;
      res.json(user);
    });
  }
});

// @route   DELETE users/:id
// @desc    Delete user by id
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.removeUser(req.params.id, (err, user) => {
    if(err) throw err;
    res.json({"message": "delete successfuly"});
  });
  
});

module.exports = router;
