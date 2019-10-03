const express = require("express")
const Task = require("../models/task")

const routes = express.Router()

routes.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

routes.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

routes.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()   
    }
})

routes.patch('/tasks/:id', async (req, res) => {
    const updateFields = Object.keys(req.body)
    const allowedFields = ['description', 'completed']
    const _id = req.params.id

    const isValidField = updateFields.every((field) => {
        return allowedFields.includes(field)
    })

    if (!isValidField) {
        return res.status(400).send({error: 'this is an invalid field'})
    }

    try {
        const updated = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!updated) {
            return res.status(404).send()
        }

        res.status(200).send(updated)
    } catch (e) {
        res.status(400).send()
    }
})

routes.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const deleted = await Task.findByIdAndDelete(_id)

        if (!deleted) {
            return res.status(404).send()
        }

        res.send(deleted)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = routes