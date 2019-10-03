require("../src/db/mongoose")
const Task = require("../src/models/task")

// Task.findByIdAndDelete('5d94695384a405f9d0779066').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((tasks) => {
//     console.log(tasks)
// }).catch((err) => {
//     console.log(err)
// })

const findAndDelete = async (id) => {
    const operation = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

findAndDelete('5d94695384a405f9d0779066').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log('Err:', e)
})