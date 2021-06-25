const express = require('express');
const router = express.Router();
const Classes = require('../Models/class');

//Accessing All at once
router.route('/')
.get( async (req, res) => {
    try {
        const allClasses = await Classes.find();
        res.status(200).json(allClasses).send();
    } catch (err) {
        res.status(400).json({ message: err }).send();
    }
})
.post(async (req, res) => {
    const Class = new Classes({
        ClassName: req.body.ClassName,
        ClassType: req.body.ClassType,
        ClassInstructor: req.body.ClassInstructor,
        ClassSubject: req.body.ClassSubject,
        ClassTime: req.body.ClassTime
    });

    try {
        const saveClass = await Class.save();
        res.json(saveClass);
    } catch (err) {
        res.json({ message: err });
    }
})
.patch( async (req, res) => {
    try {
        const updateClass = await Classes.updateMany({$set:{ClassType: req.body.ClassType}});
        res.json(updateClass);
    } catch (err) {
        res.json({ message: err });
    }
})

.delete(async (req, res) => {
    try {
        const removeClass = await Classes.remove();
        res.json(removeClass);
    } catch (err) {
        res.json({ message: err });
    }
});

//Access Specific
router.route('/:classId')
.get(async (req, res) => {
    try {
        const specificClass = await Classes.findOne({_id:req.params.classId});
        res.json(specificClass);
    } catch (err) {
        res.json({ message: err });
    }
})

.patch( async (req, res) => {
    try {
        const updateClass = await Classes.updateOne({_id:req.params.classId},{
            $set:{ 
                ClassName: req.body.ClassName,
                ClassType: req.body.ClassType,
                ClassInstructor: req.body.ClassInstructor,
                ClassSubject: req.body.ClassSubject,
                ClassTime: req.body.ClassTime
            }});
        res.json(updateClass);
    } catch (err) {
        res.json({ message: err });
    }
})

.delete(async (req, res) => {
    try {
        const removeClass = await Classes.remove({_id:req.params.classId});
        res.json(removeClass);
    } catch (err) {
        res.json({ message: err });
    }
});
module.exports = router;