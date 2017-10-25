const express = require('express')
const router = express.Router()

// include controller
const userControllers = require('../controllers/user')

// include libary validate data
const { validateBody, schemas } = require('../lib/joi')

router.route('/')
    .get(userControllers.allUsers)

router.route('/:id')
    .get(userControllers.getUser)

router.route('/add')
    .post(validateBody(schemas.user), userControllers.addUser)

router.route('/update/:id')
    .put(userControllers.updateUser)

router.route('/delete/:id')
    .delete(userControllers.deleteUser)

module.exports = router