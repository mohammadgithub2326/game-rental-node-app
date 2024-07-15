const express = require('express');
const router = express.Router();
const usersController = require('../Controllers/usersController');

// Route for user registration
router.post('/Register', usersController.registerUser);
router.get('/ViewUserDetails/:username', usersController.viewUserDetails);
router.put('/UpdateUserDetails', usersController.updateUserDetails);
router.post('/Login', usersController.login);

module.exports = router;
