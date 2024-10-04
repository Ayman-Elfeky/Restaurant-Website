const { RequiredValidator } = require('@angular/forms')
const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profileImage: {
            type: String,
            required: false,
            default: '../../Play.png'
        },
        isAdmin: {
            type: Boolean,
            default: false
        },

        // will add Role
        roles: {
            type: [Schema.Types.ObjectId],
            required: true,
            ref: 'Role'
        }
    },

    // timeStamps Object (With s)
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema);