const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    Classname: {              
        type: String,
        required: true,
        unique: true,
        default: ""
    },
    ClassType: {              
        type: String,
        required: true,
        default: ""
    },
    ClassInstructor: {              
        type: String,
        required: true,
        default: ""
    },
    ClassSubject: {              
        type: String,
        default: ""
    },
    ClassTime: {              
        type: String,
        default: ""
    },
}, {
    timestamps: true
})

var Classes = mongoose.model('class', ClassSchema);

module.exports = Classes;