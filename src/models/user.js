const { ObjectID } = require("mongodb")
const mongoose = require("mongoose")
const validator = require("validator")

const User = mongoose.model('User', {
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = User