const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  authController.getProfile
);
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
