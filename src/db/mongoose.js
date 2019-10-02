const mongoose = require("mongoose")
const validator = require("validator")

mongoose.connect('mongodb://127.0.0.1:27017/task-manager', {
    useNewUrlParser: true,
    useCreateIndex: true
})

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

// const me = new User({
//     name: 'Muhammed',
//     email: 'hello@mm.com',
//     password: 'possible',
//     age: 29
// })

// me.save().then((m) => {
//     console.log(m)
// }).catch((error) => {
//     console.log('Error', error)
// })

const Task = mongoose.model('Tasks', {
    description: {
        type: String,
        require: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Task({
    description: 'Learn mongoose library',
    completed: false
})

task.save().then((t) => {
    console.log(t)
}).catch((e) => {
    console.log(e)
})