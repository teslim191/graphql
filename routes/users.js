const express = require('express')
const router = express.Router()
const User = require('../models/Users')

router.get('/', (req, res) => {
    res.render('users')
})

router.post('/list', async (req, res) => {
    const { name, email, age } = req.body

    try {
        let users = await User.create({ name,email,age })
        res.json(users).status(200)
    } catch (error) {
        console.log(error)
    }
})

router.get('/registered-users', async (req, res) => {
    
    try {
        let users = await User.find()
        res.json(users)

    } catch (error) {
        console.log(error)
    }
})

router.get('/registered-users/:id', async (req, res) => {
    
    try {
        let users = await User.findById({_id: req.params.id})
        res.json({users})

    } catch (error) {
        console.log(error)
    }
})


module.exports = router