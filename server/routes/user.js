const express = require('express')
const router = express.Router()

// include controller
const userControllers = require('../controllers/user')

// include libary validate data
const { validateBody, schemas } = require('../lib/joi')

// include passport
const passport = require('passport')
const passportConf = require('../passport')

router.route('/')
    .get(passport.authenticate('jwt', { session: false }), userControllers.allUsers)

router.route('/:id')
    .get(userControllers.getUser)

router.route('/add')
    .post(validateBody(schemas.user), userControllers.addUser)

router.route('/update/:id')
    .put(userControllers.updateUser)

router.route('/delete/:id')
    .delete(userControllers.deleteUser)

router.route('/signin')
    .post(userControllers.signin)

module.exports = router