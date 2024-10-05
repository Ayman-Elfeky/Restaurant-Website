const express = require('express');
const { getAllUsers, getUserById } = require('../Controllers/user.controller');
const { verifyAdmin, verifyUser } = require('../utilities/verify.token');

const router = express.Router();

// get all
router.get('/', verifyAdmin, getAllUsers);

// get by id
router.get('/:id', verifyUser, getUserById);

module.exports = router;