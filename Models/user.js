const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Username: {              
        type: String,
        required: true,
        unique: true,
        default: ""
    },
    Password: {              
        type: String,
        required: true,
        default: ""
    },
    Role: {              
        type: String,
        required: true,
        default: ""
    },
    Validated: {              
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
})

var Users = mongoose.model('user', UserSchema);

module.exports = Users;