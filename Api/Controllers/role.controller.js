const role = require('../Models/role.js')

// create A Role controller
const createRole = async (req, res, next)=>{
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
}

// update A Role controller
const updateRole =  async (req, res, next)=>{
    try {
        const Role = await role.findById({_id: req.params.id})
        if(Role){
            const newData = await role.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            );
            res.status(200).send('Role Updated')
            // console.log(req.body)
        }else{
            res.status(400).send('Bad Request')
        }
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

// get all roles controller
const getAllRoles = async (req, res, next)=>{
    try {
        const Roles = await role.find({});    // Give me all the roles without filters (Admin and Users together)
        res.status(200).send(Roles)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

// Delete A role controller
const deleteRole = async (req, res, next)=> {
    try {
        const Role = await role.findById({_id: req.params.id});
        if(Role){
            await role.findByIdAndDelete(req.params.id);
            res.status(200).send('Role Deleted')
        }else{
            res.status(400).send('Role Not Found')
        }
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    createRole,
    updateRole,
    getAllRoles,
    deleteRole
}