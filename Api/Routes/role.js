const express = require('express');
const role = require('../Models/role.js');

// Create CRUD operations
const router = express.Router();

router.post('/create', async (req, res, next)=>{
    try {
        if(req.body.role && req.body.role !== '') {
            const newRole = new role(req.body);
            await newRole.save();
            res.send('Role added')
        }else{
            res.status(400).send('Bad Request')
        }
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router;