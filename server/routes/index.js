'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();
module.exports = router;

router.use('/students', require('./students'));
router.use('/campuses', require('./campuses'));

// Make sure this is after all of
// the registered routes!
// router.use(function (req, res) {
//   res.status(404).end();
// });