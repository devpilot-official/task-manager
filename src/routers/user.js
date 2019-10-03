const express = require("express")
const User = require("../models/user")

const routes = express.Router()

routes.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

routes.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.status(201).send(users)
    } catch (e) {
        res.status(500).send()
    }
})

routes.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }

        res.status(201).send(user)
    } catch (e) {
        res.status(500).send()
    }
})

routes.patch('/users/:id', async (req, res) => {
    const updatesField = Object.keys(req.body)
    const allowedFields = ['name', 'email', 'password', 'age']
    const _id = req.params.id

    const isValidField = updatesField.every((field) => {
        return allowedFields.includes(field)
    })

    if (!isValidField) {
        return res.status(400).send({error: 'Invalid update field'})
    }

    try {
        const updated = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!updated) {
            return res.status(404).send()
        }

        res.status(200).send(updated)
    } catch (e) {
        res.status(400).send()
    }

})

routes.delete('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const deleted = await User.findByIdAndDelete(_id)

        if (!deleted) {
            return res.status(404).send()
        }

        res.send(deleted)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = routes