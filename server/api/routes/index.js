const express = require('express');
const router = express.Router();
const passport = require('passport');
const authApi = require('./auth.route');
const testApi = require('./test.route');
const recordApi = require('./record.route');

router.use('/auth', authApi);
router.use('/tests', testApi);
router.use(
  '/records',
  passport.authenticate('jwt', { session: false }),
  recordApi
);

module.exports = router;
