const express = require('express');
const router = express.Router();
const Users = require('../Models/user');

//Accessing All at once
router.route('/')
.get( async (req, res) => {
    try {
        const allUsers = await Users.find();
        res.status(200).json(allUsers).send();
    } catch (err) {
        res.status(400).json({ message: err }).send();
    }
})
.post(async (req, res) => {
    const User = new Users({
        Username: req.body.Username,
        Password: req.body.Password,
        MobileNumber: req.body.MobileNumber,
        Role: req.body.Role,
        Validated: req.body.Validated
    });

    try {
        const saveUser = await User.save();
        res.json(saveUser);
    } catch (err) {
        res.json({ message: err });
    }
})
.patch( async (req, res) => {
    try {
        const updateUser = await Users.updateMany({$set:{Validated:req.body.Validated}});
        res.json(updateUser);
    } catch (err) {
        res.json({ message: err });
    }
})
.delete(async (req, res) => {
    try {
        const removeUser = await Users.remove();
        res.json(removeUser);
    } catch (err) {
        res.json({ message: err });
    }
});

//Access Specific
router.route('/:userId')
.get(async (req, res) => {
    try {
        const specificUser = await Users.findOne({_id:req.params.userId});
        res.json(specificUser);
    } catch (err) {
        res.json({ message: err });
    }
})

.patch( async (req, res) => {
    try {
        const updateUser = await Users.updateOne({_id:req.params.userId},{
            $set:{ 
                Password: req.body.Password,
                MobileNumber: req.body.MobileNumber,
                Role: req.body.Role,
                Validated: req.body.Validated
            }});
        res.json(updateUser);
    } catch (err) {
        res.json({ message: err });
    }
})

.delete(async (req, res) => {
    try {
        const removeUser = await Users.remove({_id:req.params.userId});
        res.json(removeUser);
    } catch (err) {
        res.json({ message: err });
    }
});
module.exports = router;