const { ObjectID } = require("mongodb")
const mongoose = require("mongoose")

const Task = mongoose.model('Tasks', {
    userID: {
        type: ObjectID,
        required: true,
        ref: 'User',
        trim: true
    },
    task: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true
    }
})

module.exports = Task