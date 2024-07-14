const express = require('express');
const router = express.Router();
const usersController = require('../Controllers/usersController');

// Route for user registration
router.post('/register', usersController.registerUser);
router.get('/user/:username', usersController.viewUserDetails);
router.put('/user', usersController.updateUserDetails);
router.post('/login', usersController.login);

module.exports = router;
