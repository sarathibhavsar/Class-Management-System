const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnrollmentSchema = new Schema({
    ClassID: {              
        type: mongoose.Schema.ObjectId,
        required: true,
        default: ""
    },
    StudentID: {              
        type: String,
        required: true,
        default: ""
    },
}, {
    timestamps: true
})

var Enrollments = mongoose.model('enrollment', EnrollmentSchema);

module.exports = Enrollments;