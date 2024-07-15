const express = require('express');
const router = express.Router();
const usersController = require('../Controllers/usersController');

// Route for user registration
router.post('/Register', usersController.registerUser);
router.get('/View User Details/:username', usersController.viewUserDetails);
router.put('/Update User Details', usersController.updateUserDetails);
router.post('/Login', usersController.login);

module.exports = router;
