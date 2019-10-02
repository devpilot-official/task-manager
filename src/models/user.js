const mongoose = require("mongoose")
const validator = require("validator")

const User = mongoose.model('User', {
    name: {
        type: String,
        require: true,
        trim: true
    }, 
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid")
            }
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 7,
        trim: true,
        validate(value){
            if (validator.contains(value, "password")) {
                throw new Error("Password cannot contain \"password\"")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0) {
                throw new Error('Age must be an integer number')
            }
        }
    }
})

module.exports = User