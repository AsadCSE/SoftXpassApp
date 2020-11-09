const express = require('express')

//import routers
const createUser = require('./createUser')
const readUser = require('./readUser')
const updateUser = require('./updateUser')
const deleteUser = require('./deleteUser')

const login = require('./login')
const logout = require('./logout')

const errorRouter = require('../error/error')

//create user router
const userRouter = new express.Router()


//add routing
userRouter.use('/login', login)
userRouter.use('/logout', logout)

userRouter.use('/create', createUser)
userRouter.use('/read', readUser)
userRouter.use('/update', updateUser)
userRouter.use('/delete', deleteUser)

//deny all other accesses
userRouter.use('*', errorRouter)

module.exports = userRouter