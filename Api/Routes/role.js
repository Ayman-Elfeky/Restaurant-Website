const express = require('express');
const { updateRole, createRole, getAllRoles, deleteRole } = require('../Controllers/role.controller.js');
const { verifyAdmin } = require('../utilities/verify.token.js');

// Create CRUD operations
const router = express.Router();

// Create a new role in DB
router.post('/create', verifyAdmin, createRole);  

// Update a role in DB
router.put('/update/:id', verifyAdmin, updateRole);

// Get all roles from DB
router.get('/getAll', getAllRoles);

// Delete a role
router.delete('/delete/:id', deleteRole);

module.exports = router; 