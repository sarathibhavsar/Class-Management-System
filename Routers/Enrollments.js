const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const Enrollments = require('../Models/enrollment');

//Accessing All at once
router.route('/')

    .get(async (req, res) => {
        try {
            const allEnrollments = await Enrollments.find();
            res.status(200).json(allEnrollments).send();
        } catch (err) {
            res.status(400).json({ message: err }).send();
        }
    })

    .post(async (req, res) => {
        const Enrollment = new Enrollments({
            StudentID: req.body.StudentID,
            ClassID: req.body.ClassID,
        });

        try {
            const saveEnrollment = await Enrollment.save();
            res.json(saveEnrollment);
        } catch (err) {
            res.json({ message: err });
        }
    })

    .patch(async (req, res) => {
        try {
            const updateEnrollment = await Enrollments.updateMany({
                $set: {
                    StudentID: req.body.StudentID,
                    ClassID: req.body.ClassID,
                }
            });
            res.json(updateEnrollment);
        } catch (err) {
            res.json({ message: err });
        }
    })

    .delete(async (req, res) => {
        try {
            const removeEnrollment = await Enrollments.remove();
            res.json(removeEnrollment);
        } catch (err) {
            res.json({ message: err });
        }
    });

//Access Specific
router.route('/:enrollmentId')
    .get(async (req, res) => {
        try {
            const specificEnrollment = await Enrollments.findOne({ _id: req.params.enrollmentId });
            res.json(specificEnrollment);
        } catch (err) {
            res.json({ message: err });
        }
    })

    .patch(async (req, res) => {
        try {
            const updateEnrollment = await Enrollments.updateOne({ _id: req.params.enrollmentId }, {
                $set: {
                    StudentID: req.body.StudentID,
                    ClassID: req.body.ClassID,
                }
            });
            res.json(updateEnrollment);
        } catch (err) {
            res.json({ message: err });
        }
    })

    .delete(async (req, res) => {
        try {
            const removeEnrollment = await Enrollments.remove({ _id: req.params.enrollmentId });
            res.json(removeEnrollment);
        } catch (err) {
            res.json({ message: err });
        }
    });


router.route('/getstudentcourses/:studentId')
    .get(async (req, res) => {
        try {
            var main = req.params.studentId;
            Enrollments.aggregate([
                {
                  $lookup: {
                    from: "classes",
                    localField: "ClassID",
                    foreignField: "_id",
                    as: "dataweneed",
                  },
                },
              
                {
                    $unwind: "$dataweneed",
                },
                {"$match":{"StudentID": req.params.studentId}}
                //{"$match":{"_id": ObjectId(req.params.tempapara)}}        //Saved for only information purpose
              ])
                .then((result) => {
                  res.json(result);
                  console.log(result);
                })
                .catch((error) => {
                  console.log(error);
            });
        } catch (err) {
            res.json({ message: err });
        }
    })

module.exports = router;