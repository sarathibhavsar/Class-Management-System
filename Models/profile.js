const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    UserID:{
        type: String,
        required: true,
        unique: true,
        default: ""
    },
    FirstName: {              
        type: String,
        required: true,
        default: ""
    },
    MiddleName: {              
        type: String,
        required: true,
        default: ""
    },
    LastName: {              
        type: String,
        required: true,
        default: ""
    },
    ContactNumber: {              
        type: Number,
        unique: true,
        default: ""
    },
    EmailID: {              
        type: String,
        unique: true,
        default: ""
    },
    Address: {              
        type: String,
        default: ""
    },
}, {
    timestamps: true
})

var Profiles = mongoose.model('profile', ProfileSchema);

module.exports = Profiles;