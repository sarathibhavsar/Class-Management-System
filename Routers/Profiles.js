const express = require('express');
const router = express.Router();
const Profiles = require('../Models/profile');

//Accessing All at once
router.route('/')
.get( async (req, res) => {
    try {
        const allProfiles = await Profiles.find();
        res.status(200).json(allProfiles).send();
    } catch (err) {
        res.status(400).json({ message: err }).send();
    }
})
.post(async (req, res) => {
    const Profile = new Profiles({
        UserID: req.body.UserID,
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        ContactNumber: req.body.ContactNumber,
        EmailIDAddress: req.body.EmailIDAddress
    });

    try {
        const saveProfile = await Profile.save();
        res.json(saveProfile);
    } catch (err) {
        res.json({ message: err });
    }
})
.patch( async (req, res) => {
    try {
        const updateProfile = await Profiles.updateMany({$set:{
            FirstName: req.body.FirstName,
            MiddleName: req.body.MiddleName,
            LastName: req.body.LastName,
            ContactNumber: req.body.ContactNumber,
            EmailID: req.body.EmailID,
            Address: req.body.Address
        }});
        res.json(updateProfile);
    } catch (err) {
        res.json({ message: err });
    }
})
.delete(async (req, res) => {
    try {
        const removeProfile = await Profiles.remove();
        res.json(removeProfile);
    } catch (err) {
        res.json({ message: err });
    }
});

//Access Specific
router.route('/:profileId')
.get(async (req, res) => {
    try {
        const specificProfile = await Profiles.findOne({_id:req.params.profileId});
        res.json(specificProfile);
    } catch (err) {
        res.json({ message: err });
    }
})

.patch( async (req, res) => {
    try {
        const updateProfile = await Profiles.updateOne({_id:req.params.profileId},{
            $set:{ 
                FirstName: req.body.FirstName,
                MiddleName: req.body.MiddleName,
                LastName: req.body.LastName,
                ContactNumber: req.body.ContactNumber,
                EmailID: req.body.EmailID,
                Address: req.body.Address
            }});
        res.json(updateProfile);
    } catch (err) {
        res.json({ message: err });
    }
})

.delete(async (req, res) => {
    try {
        const removeProfile = await Profiles.remove({_id:req.params.profileId});
        res.json(removeProfile);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;

